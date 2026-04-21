Context کامل پروژه برای ادامه توسعه Backend — Next.js Job Board SaaS

این پیام شامل خلاصه کامل وضعیت پروژه، خطاهای قبلی، مراحل دیباگ انجام‌شده و اصلاحات نهایی است. لطفاً آن را به عنوان Context اصلی پروژه در نظر بگیر و از تکرار مراحل حل‌شده جلوگیری کن.

هدف این چت جدید ادامه توسعه Backend پروژه است، نه تکرار debuggingهای قبلی.

مشخصات پروژه

نام پروژه:

job-board-saas

نوع پروژه:

یک SaaS برای مدیریت و انتشار آگهی‌های شغلی.

تکنولوژی‌های استفاده‌شده:

Next.js 15.5.15

React

TypeScript

App Router

Drizzle ORM

PostgreSQL

TailwindCSS

ساختار پروژه بر پایه App Router در Next.js است.

پروژه شامل دو بخش اصلی است:

Public Job Board

Employer Dashboard

مشکل اولیه که باعث شروع فرایند دیباگ شد

هنگام اجرای دستور:

npm run build

پروژه با چند نوع خطای مختلف مواجه می‌شد:

TypeScript errors

Prerender errors

Database schema errors

Dependency resolution errors

این خطاها باعث می‌شدند build پروژه کامل نشود.

در ادامه مراحل کامل debugging انجام شد.

مرحله اول دیباگ: ناسازگاری React با Next.js

در ابتدا پروژه از نسخه زیر استفاده می‌کرد:

react 19.2.4

react-dom 19.2.4

اما Next.js 15 هنوز به صورت کامل با React 19 پایدار نیست و dependency tree دچار مشکل می‌شود.

در محیط build (خصوصاً در Vercel یا Linux build environments) این مشکل باعث خطاهایی مانند:

Exit handler never called

یا dependency resolution failure می‌شود.

راه‌حل انجام شده:

React به نسخه پایدار سازگار با Next 15 downgrade شد.

نسخه نهایی:

react ^18.3.1

react-dom ^18.3.1

پس از آن:

node_modules حذف شد

package-lock.json حذف شد

سپس:

npm install

اجرا شد.

این مشکل کاملاً حل شد.

مرحله دوم دیباگ: تغییرات TypeScript در Next.js 15

Next.js 15 تغییر مهمی در نوع props صفحات dynamic ایجاد کرده است.

در نسخه‌های قبلی:

params یک object معمولی بود.

اما در Next.js 15:

params و searchParams به صورت Promise تعریف می‌شوند.

اگر صفحات هنوز با الگوی قدیمی نوشته شده باشند، هنگام build خطای TypeScript ایجاد می‌شود.

مثال خطا:

Type ‘{ params: { id: string } }’ does not satisfy constraint ‘PageProps’

راه‌حل انجام شده برای صفحات Dynamic

تمام صفحات dynamic route به الگوی جدید Next.js 15 تبدیل شدند.

ساختار جدید:

type Params = {

id: string;

};

type PageProps = {

params: Promise<Params>;

searchParams?: Promise<Record<string, string | string[] | undefined>>;

};

export default async function Page({ params, searchParams }: PageProps) {

const { id } = await params;

const query = await searchParams;

return <div>{id}</div>;

}

صفحات اصلاح‌شده در پروژه

چندین صفحه dynamic با این الگو اصلاح شدند.

از جمله:

jobs/[id]/page.tsx

jobs/[id]/apply/page.tsx

(dashboard)/employer/jobs/[id]/page.tsx

(dashboard)/employer/jobs/[id]/applications/page.tsx

(dashboard)/employer/jobs/[id]/applications/edit/page.tsx

reset-password/page.tsx

پشتیبانی از پارامترهای چندگانه

در مسیرهایی مانند:

jobs/[jobId]/applications/[appId]/page.tsx

الگوی زیر استفاده شد:

type Params = {

jobId: string;

appId: string;

};

type Props = {

params: Promise<Params>;

};

export default async function Page({ params }: Props) {

const { jobId, appId } = await params;

return (

<div>

Job {jobId} Application {appId}

</div>

);

}

بهبود ساختار تایپ‌ها در پروژه

برای تمیزتر شدن تایپ‌ها، یک utility type ایجاد شد:

src/types/next.ts

export type PageSearchParams = Promise<

Record<string, string | string[] | undefined>

;

export type PageParams<T> = Promise<T>;

و در صفحات به شکل زیر استفاده شد:

type Params = {

id: string;

};

type Props = {

params: PageParams<Params>;

};

مرحله سوم دیباگ: خطای دیتابیس در زمان Build

در زمان build خطای زیر رخ داد:

column “is_remote” does not exist

ریشه مشکل:

ستون is_remote در schema Drizzle تعریف شده بود اما migration روی دیتابیس اجرا نشده بود.

راه‌حل انجام شده:

دستور زیر روی دیتابیس اجرا شد:

ALTER TABLE jobs ADD COLUMN is_remote boolean DEFAULT false;

پس از آن build پروژه کاملاً موفق شد.

مرحله چهارم دیباگ: مشکل npm registry

npm install با خطای زیر مواجه می‌شد:

402 Payment Required

mirror-npm.runflare.com

مشکل این بود که registry سیستم به یک mirror اشتباه تنظیم شده بود.

اصلاح انجام شد:

npm config set registry https://registry.npmjs.org/

همچنین یک environment variable خطرناک حذف شد:

NODE_TLS_REJECT_UNAUTHORIZED=0

که امنیت TLS را غیرفعال می‌کرد.

وضعیت فعلی پروژه

در حال حاضر:

پروژه به صورت کامل در محیط local build می‌شود.

npm run build

بدون خطای TypeScript اجرا می‌شود.

تمام dynamic routes با استاندارد Next.js 15 اصلاح شده‌اند.

dependency های React و Next.js پایدار هستند.

schema دیتابیس با پروژه هماهنگ است.

نکته مهم

فرایند deploy در Vercel فعلاً به دلیل محدودیت اینترنت متوقف شده است.

بنابراین تمرکز این چت باید روی موارد زیر باشد:

تکمیل معماری Backend

بهبود API routes

مدیریت دیتابیس و schema

طراحی workflow سیستم

سیستم authentication

سیستم job posting

سیستم job applications

در ادامه این چت می‌خواهم:

Backend architecture پروژه را کامل کنیم

APIهای مورد نیاز را طراحی کنیم

ساختار service layer و repository را بررسی کنیم

مدل‌های دیتابیس را بهینه کنیم

و workflow کامل سیستم job board را پیاده‌سازی کنیم.

لطفاً با در نظر گرفتن این context کامل، ادامه توسعه backend پروژه را راهنمایی کن.

