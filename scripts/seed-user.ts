import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

async function seed() {
  console.log("🧹 Cleaning and Seeding databases...");
  
  // مسیر هر دو فایل
  const files = [
    path.join(process.cwd(), "data", "db.json"),
    path.join(process.cwd(), "data", "test-db.json")
  ];

  const passwordHash = await bcrypt.hash("123456", 10);

  const adminUser = {
    id: "admin-1",
    email: "admin@jobboard.com",
    name: "Admin",
    passwordHash: passwordHash,
    role: "admin",
    provider: "LOCAL",
    
    updatedAt: new Date()
  };

  files.forEach(file => {
    if (fs.existsSync(file)) {
      const db = JSON.parse(fs.readFileSync(file, "utf-8"));
      
      // ۱. یوزرهای قدیمی با این ایمیل را حذف کن
      db.users = db.users.filter((u: any) => u.email !== adminUser.email);
      // ۲. ادمین جدید را اضافه کن
      db.users.push(adminUser);
      // ۳. سشن‌های قدیمی را پاک کن تا تداخلی ایجاد نشود
      db.sessions = []; 
      
      fs.writeFileSync(file, JSON.stringify(db, null, 2));
      console.log(`✅ Database synced: ${path.basename(file)}`);
    } else {
      console.log(`⚠️ File not found, skipping: ${path.basename(file)}`);
    }
  });

  console.log("\n🚀 All databases are now in sync with password: '123456'");
}

seed().catch(console.error);
