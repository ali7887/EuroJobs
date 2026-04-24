🎯 PROMPT — Full Project Context + Technical History + Next Steps
سلام.

می‌خواهم ادامه توسعه پروژه Next.js 15 خودم را بسازی.

این پرامپت شامل کل تاریخچه‌ی دقیق کارهایی است که تاکنون انجام شده و اینکه از این لحظه به بعد دقیقاً چه چیزهایی باید ساخته شود.

لطفاً تمام پاسخ‌ها را با استانداردهای زیر بده:

حرفه‌ای، دقیق، مهندسی، منطقی
ساختارمند و قابل توسعه
توجه کامل به Next.js 15، App Router، Route Handlers، Drizzle، Zod، TypeScript
بدون حدس اشتباه
کاملاً Type-Safe
1) وضعیت فعلی پروژه — خلاصه کامل کارهای انجام شده
✔ Authentication کاملاً نهایی شده
خمات انجام‌شده:

پیاده‌سازی JWT کامل
Register / Login برای user و company
نقش‌ها (user, company, admin)
Middlewareهای required-auth و optional-auth
سینک کامل نقش‌ها بین توکن و دیتابیس
حذف تمام تبدیل‌های اشتباه number → string
UUID استاندارد در کل پروژه
استخراج Token از AuthorizationHeader + Cookies
Safe decode + verify
محافظت مسیرهای حساس بر اساس نقش
نسخه فعلی کاملاً Production-ready است.

2) رفع خطاها و مشکلات Build — خلاصه ریشه‌ها و راه‌حل‌ها
مشکلاتی که هنگام Build به وجود آمد (مختصر و مفید):

❌ مشکل 1 — استفاده از NextRequest در Route Handlerها
Next.js 15 اجازه NextRequest نمی‌دهد
باعث Type mismatch در RouteContext و params می‌شد
راه‌حل: همه با Request جایگزین شد.

❌ مشکل 2 — امضاهای اشتباه در Dynamic Routeها
مثلاً [jobId]/[applicationId] پارامترهای ناقص داشت.

راه‌حل: تعریف دقیق params برای تمام segmentها.

❌ مشکل 3 — کش اشتباه .next/types
پس از هر تغییر، Next.js همچنان نوع غلط را از cache استفاده می‌کرد.

راه‌حل: حذف .next و build مجدد.

❌ مشکل 4 — UUID تبدیل شده به number
در Serviceها و ZodSchemaها اشتباهاتی مثل Number(id) وجود داشت.

راه‌حل: اصلاح کامل همه IDها به string.

❌ مشکل 5 — RouteContext سفارشی
باید حذف می‌شد چون با Type generator تداخل داشت.

راه‌حل: حذف کامل و اجازه به Next.js برای inference.

بعد از اصلاح این موارد → پروژه 100٪ Build شد و هیچ خطایی باقی نماند.

3) استاندارد نهایی و قطعی Route Handlerها (Next.js 15)
از این به بعد، فقط این استانداردها رعایت شود:

✔ امضای صحیح
text
export async function GET(req: Request, context: { params: { ... } })
✔ بدون NextRequest
✔ بدون custom RouteContext
✔ params دقیقاً برابر dynamic segmentها
✔ UUID همیشه string
✔ پاک کردن .next بعد از تغییر در API
این قوانین پایه ادامه پروژه هستند.

4) وضعیت فعلی پروژه: چه چیزهایی ساخته شده
Auth کامل
JWT کامل
Users کامل
Companies کامل
Jobs کامل
Applications کامل
Database models کامل
Role-based guards کامل
همه APIها build-ready
Zero errors in build
پروژه اکنون Production backend 100٪ سالم دارد.

5) فازهای باقی‌مانده پروژه — برای ادامه توسعه
از این لحظه‌ی جدید، باید وارد مراحل زیر شویم:

🔷 فاز 1 — بخش Frontend اپلیکیشن (Next.js / React / TypeScript)
صفحه Home
صفحه Job listings
صفحه Job details
صفحه Create Job
صفحه داشبورد Employer
صفحه پروفایل User
صفحه‌های Authentication (Login/Register)
UI کامل با Tailwind/Design System
🔷 فاز 2 — اتصال کامل Frontend ↔ API
استفاده از fetch با cookies و bearer token
مدیریت auth state
SSR برای صفحات عمومی
Client-side protected pages
🔷 فاز 3 — Employer Dashboard
مدیریت آگهی‌ها
مدیریت درخواست‌ها (applications)
گزارش‌گیری / آمار
🔷 فاز 4 — User Dashboard
لیست درخواست‌های ارسال‌شده
ویرایش پروفایل
مدیریت رزومه
🔷 فاز 5 — UX Enhancements
Toast
Loading states
Error boundary
فرم‌ها + Zod validation
🔷 فاز 6 — Deployment
Vercel یا Docker + VPS
تنظیم ENV production
Secure cookies
Database migrations در production
6) از این لحظه: انتظار از مدل
با استفاده از این تاریخچه، می‌خواهم:

ادامه پروژه را بسازی
هر بخش را مرحله‌به‌مرحله و حرفه‌ای
بدون معرفی خطای تایپی یا signature اشتباه
مطابق استانداردهای Next.js 15
و هر مرحله قبل از اجرا طراحی معماری ارائه شود.

📌 پایان پرومپت