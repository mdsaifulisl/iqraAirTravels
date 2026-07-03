const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const hpp = require("hpp");
const cluster = require("cluster"); // ১. ক্লাস্টার মডিউল ইমপোর্ট
const os = require("os");           // ২. ওএস মডিউল ইমপোর্ট (কোর সংখ্যা জানার জন্য)

// Import Database 
const { connectDB } = require("./config/db");
const User = require("./models/User"); 

// Import Routes
const tourRoutes = require("./routes/tourRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const visaRoutes = require("./routes/visaRoutes");
const airTicketRoutes = require("./routes/airTicketRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const faqRoutes = require("./routes/faqRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const settingRoutes = require("./routes/settingRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// --- Seeding Function ---
const seedAdmin = async () => {
  try {
    const userCount = await User.count();
    if (userCount === 0) {
      console.log("Database is empty. Creating default admin user...");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        email: "admin@agency.com",
        password: hashedPassword,
        role: "Super Admin",
        status: "Active"
      });
      console.log("✅ Default Admin Created! (Email: admin@agency.com, Pass: admin123)");
    }
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

// --- ক্লাস্টার লজিক শুরু ---
if (cluster.isMaster) {
  // সার্ভারে কয়টি CPU কোর আছে তা বের করা
  const numCPUs = os.cpus().length;
  console.log(`Master process ${process.pid} is running. Spinning up ${numCPUs} workers...`);

  // প্রতি কোরের জন্য একটি করে Worker Process তৈরি করা
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // কোনো Worker ডাউন বা ক্র্যাশ হয়ে গেলে স্বয়ংক্রিয়ভাবে নতুন Worker তৈরি করা (Zero Downtime)
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork();
  });

} else {
  // --- Worker Process: এখানে এক্সপ্রেস অ্যাপের মেইন কোড রান হবে ---
  const app = express();

  // --- Middleware ---
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // --- Security Middleware ---
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "trusted-cdn.com"],
        },
      },
    })
  );
  app.use(hpp());

  // --- Static Files ---
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      },
    })
  );

  // --- Routes ---
  app.use("/api/tours", tourRoutes);
  app.use("/api/destinations", destinationRoutes);
  app.use("/api/visas", visaRoutes);
  app.use("/api/airtickets", airTicketRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/contacts", contactRoutes);
  app.use("/api/sliders", sliderRoutes);
  app.use("/api/faqs", faqRoutes);
  app.use("/api/about", aboutRoutes);
  app.use("/api/settings", settingRoutes);
  app.use("/api/users", userRoutes);

  app.use(express.static(path.join(__dirname, "..", "client", "dist")));

  app.get(/\/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
  });

  // --- Server Startup and Database Connection ---
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(async () => { 
      // সিডিং ফাংশন শুধুমাত্র ডেটাবেজ চেক করবে, তাই রান হতে সমস্যা নেই
      await seedAdmin(); 

      app.listen(PORT, () => {
        console.log(`🚀 Worker ${process.pid} connected to DB & running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error(`❌ Worker ${process.pid} failed to connect to DB:`, err.message);
      process.exit(1); 
    });
}