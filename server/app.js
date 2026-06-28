const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const hpp = require("hpp");

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

// Initialize Express app
const app = express();

// --- Middleware ---
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Security Middleware ---
// app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "trusted-cdn.com"],
//       },
//     },
//   })
// );



// app.use(hpp());
// --- Static Files ---
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    },
  })
);

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

// Base Route
// app.get("/", (req, res) => {
//   res.send("Travel Agency API is running...");
// });

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

// ২. all react app index.html file
app.get(/\/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// --- Server Startup and Database Connection ---
const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => { 
    await seedAdmin(); 

    // ২. 
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err.message);
    process.exit(1); 
  });



  