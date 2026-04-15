شما یک متخصص ارشد تست نرم‌افزار هستید و باید برای پروژه من (Next.js + TypeScript + Drizzle ORM + Service Layer + API Routes + React Components) کل تست‌ها را طبق ساختار زیر تولید کنید.

می‌خواهم مجموعه تست‌ها دقیقاً مطابق چک‌لیست زیر تولید شوند، با مسیر فایل دقیق، ساختار فولدر درست، mock های حرفه‌ای، کد تست کامل، TypeScript معتبر و کامل، به‌همراه توضیحات لازم.

=====================================================================
# بخش ۰) ساختار پوشه تست‌ها

ساختار تست‌ها باید دقیقاً به این صورت باشد:

src/
  lib/
    repositories/
      job-applications.repository.ts
      __tests__/
        job-applications.repository.test.ts

    services/
      application.service.ts
      __tests__/
        application.service.test.ts

  app/
    api/
      applications/
        route.ts
        __tests__/
          applications.api.test.ts

components/
  ApplicationForm.tsx
  ApplicationList.tsx
  __tests__/
    ApplicationForm.test.tsx
    ApplicationList.test.tsx

tests/
  setup/
    jest.setup.ts

=====================================================================
# A) Repository Tests
برای فایل:
src/lib/repositories/job-applications.repository.ts

تست‌های زیر باید تولید شوند:

1) mock drizzle (mock کامل db: insert, select, update, delete, where, returning…)
2) تست create
3) تست updateStatus
4) تست delete
5) تست findById
6) تست findExisting
7) تست findByUser
8) تست findByJob

تمام تست‌ها باید:
- Drizzle را mock کنند
- فقط رفتار Repository را تست کنند
- داده‌های fake و واقع‌گرایانه داشته باشند
- از jest.fn() و jest.mock() استفاده کنند
- خروجی آرایه‌ای Drizzle returning را رعایت کنند

=====================================================================
# B) Service Tests
برای فایل:
src/lib/services/application.service.ts

تست‌های زیر باید ساخته شوند:

1) applyToJob (success)
2) applyToJob (throw: Already applied)
3) getApplicationById
4) updateStatus
5) deleteApplication

همه Repository ها باید mock شوند.

تست‌ها باید:
- رفتار سرویس را تست کنند، نه Drizzle
- برای هر test سناریوی موفق و خطا تولید کنند
- ورودی‌ها و خروجی‌ها دقیق باشند

=====================================================================
# C) API Route Tests
برای مسیر:
src/app/api/applications/route.ts

تست‌ها باید شامل:

1) تست موفق (status 200)
2) تست ورودی اشتباه (400)
3) تست خطای سرویس (500)

تست‌ها باید:
- Service Layer را mock کنند
- Request واقعی Next.js ایجاد کنند
- Response نهایی را بررسی کنند

=====================================================================
# D) Frontend Component Tests
برای فایل‌ها:

components/ApplicationForm.tsx  
components/ApplicationList.tsx  

تست‌ها باید شامل:

1) تست render → کامپوننت درست رندر شود
2) تست submit → فرم درست ارسال شود
3) تست interaction → تغییر فیلدها، کلیک‌ها
4) تست list rendering → لیست نمایش داده شود

ابزار:
- React Testing Library
- jest-dom

=====================================================================
# E) Setup
لازم است فایل setup نیز تولید شود:

tests/setup/jest.setup.ts  
که داخل آن:
- jest-dom import شود
- هر config لازم اضافه شود

=====================================================================
# قوانین تولید تست‌ها
تست‌ها باید:

✔ با TypeScript دقیق نوشته شوند  
✔ شامل mock‌های کامل و اصولی باشند  
✔ شامل expectها و assertions واضح باشند  
✔ در مسیرهای درست ذخیره شوند  
✔ نام describe و it حرفه‌ای باشد  
✔ استانداردهای enterprise-level testing را رعایت کنند  

=====================================================================
# خروجی مورد انتظار از شما

می‌خواهم برای *تمام چک‌لیست بالا*:

✔ فایل تست کامل  
✔ مسیر فایل  
✔ کل کد کامل تست  
✔ mock ها  
✔ توضیح برای هر بخش  
✔ بدون حذف هیچ مورد  

را تولید کنید.

این تست‌ها باید "executive-level" باشند؛ یعنی مستقیم قابل اجرا و به‌درد production بخورند.

=====================================================================
