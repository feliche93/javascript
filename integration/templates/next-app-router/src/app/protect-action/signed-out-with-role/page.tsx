'use client';
import { logUserIdActionRole } from '@/app/protect-action/actions';
import { PageComponent } from '@/app/protect-action/page-component';

function Page() {
  return <PageComponent action={logUserIdActionRole} />;
}

export default Page;