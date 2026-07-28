// utils/imageUtils.js

export const compressImageNative = (file, maxWidth = 1600, maxHeight = 1600, quality = 0.7) => {
  return new Promise((resolve) => {
    // ফাইল না থাকলে, ইমেজ টাইপ না হলে বা ফাইল আগেই ছোট (< 300KB) হলে সরাসরি রিটার্ন
    if (!file || !file.type || !file.type.startsWith('image/') || file.size < 300 * 1024) {
      return resolve(file);
    }

    // FileReader-এর চেয়ে Instant/Fast ObjectURL
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      // Memory cleanup
      URL.revokeObjectURL(objectUrl);

      let width = img.width;
      let height = img.height;

      // Aspect ratio বজায় রেখে সাইজ ক্যালকুলেশন
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      // alpha: false দিলে ট্রান্সপারেন্সি প্রসেস বাদ দিয়ে ক্যানভাস অনেক দ্রুত কাজ করে
      const ctx = canvas.getContext('2d', { alpha: false });
      
      // Fast scaling quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return resolve(file); // ফেইল করলে অরিজিনাল ফাইল রিটার্ন
          }

          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          // কমপ্রেস করা ফাইল বড় হলে অরিজিনালটা দেবে, নাহলে কমপ্রেসড ফাইল দেবে
          resolve(compressedFile.size < file.size ? compressedFile : file);
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // এরর হলে অ্যাপ না আটকে অরিজিনাল ফাইল পাস করবে
    };

    img.src = objectUrl;
  });
};