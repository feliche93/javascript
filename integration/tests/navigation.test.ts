import { test } from '@playwright/test';

import type { Application } from '../models/application';
import { appConfigs } from '../presets';
import type { FakeUser } from '../testUtils';
import { createTestUtils } from '../testUtils';

test.describe('navigation modes @generic', () => {
  test.describe.configure({ mode: 'serial' });
  let app: Application;
  let fakeUser: FakeUser;

  test.beforeAll(async () => {
    app = await appConfigs.next.appRouter
      .clone()
      .addFile(
        'src/app/provider.tsx',
        () => `'use client'
import { ClerkProvider } from "@clerk/nextjs";

export function Provider({ children }: { children: any }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}`,
      )
      .addFile(
        'src/app/layout.tsx',
        () => `import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}`,
      )
      .addFile(
        'src/app/hash/user/[[...catchall]]/page.tsx',
        () => `
import { UserProfile, UserButton } from '@clerk/nextjs';

export default function Page() {
  return (
    <div>
      <UserButton />
      <UserProfile routing="hash" />
    </div>
  );
}`,
      )
      .addFile(
        'src/app/hash/sign-in/[[...catchall]]/page.tsx',
        () => `
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignIn routing="hash" />
  );
}`,
      )
      .commit();
    await app.setup();
    await app.withEnv(appConfigs.envs.withEmailCodes);
    await app.build();

    const m = createTestUtils({ app });
    fakeUser = m.services.users.createFakeUser();
    await m.services.users.createBapiUser(fakeUser);

    await app.serve();
  });

  test.afterAll(async () => {
    await fakeUser.deleteIfExists();
    await app.teardown();
  });

  //TODO-RETHEME: Refactor this, because this path doesn't exist anymore
  // test('user profile with path routing', async ({ page, context }) => {
  //   const u = createTestUtils({ app, page, context });
  //   await u.po.signIn.goTo();
  //   await u.po.signIn.waitForMounted();
  //   await u.po.signIn.signInWithEmailAndInstantPassword({ email: fakeUser.email, password: fakeUser.password });
  //   await u.po.expect.toBeSignedIn();
  //
  //   await u.po.userProfile.goTo();
  //   await u.po.userProfile.waitForMounted();
  //
  //   await u.page.getByText(/Set username/i).click();
  //
  //   await u.page.waitForURL(`${app.serverUrl}/user/username`);
  //
  //   await u.page.getByText(/Cancel/i).click();
  //
  //   await u.page.waitForURL(`${app.serverUrl}/user`);
  //
  //   await u.page.getByText(/Add email address/i).click();
  //
  //   await u.page.waitForURL(`${app.serverUrl}/user/email-address`);
  //
  //   await u.page.getByText(/Cancel/i).click();
  //
  //   await u.page.waitForURL(`${app.serverUrl}/user`);
  // });

  //TODO-RETHEME: Refactor this, because this path doesn't exist anymore
  // test('user profile with hash routing', async ({ page, context }) => {
  //   const u = createTestUtils({ app, page, context });
  //   await u.po.signIn.goTo();
  //   await u.po.signIn.waitForMounted();
  //   await u.po.signIn.signInWithEmailAndInstantPassword({ email: fakeUser.email, password: fakeUser.password });
  //   await u.po.expect.toBeSignedIn();
  //
  //   await u.page.goToRelative('/hash/user');
  //   await u.po.userProfile.waitForMounted();
  //
  //   await u.page.getByText(/Set username/i).click();
  //
  //   expect(u.page.url()).toBe(`${app.serverUrl}/hash/user#/username`);
  //
  //   await u.page.getByText(/Cancel/i).click();
  //
  //   expect(u.page.url()).toBe(`${app.serverUrl}/hash/user#`);
  //
  //   await u.page.getByText(/Add email address/i).click();
  //
  //   expect(u.page.url()).toBe(`${app.serverUrl}/hash/user#/email-address`);
  //
  //   await u.page.getByText(/Cancel/i).click();
  //
  //   expect(u.page.url()).toBe(`${app.serverUrl}/hash/user#`);
  // });

  // TODO-RETHEME: fix this test
  // test('sign in with path routing', async ({ page, context }) => {
  //   const u = createTestUtils({ app, page, context });
  //   await u.po.signIn.goTo();
  //   await u.po.signIn.waitForMounted();
  //
  //   await u.po.signIn.setIdentifier(fakeUser.email);
  //   await u.po.signIn.continue();
  //   await u.page.waitForURL(`${app.serverUrl}/sign-in/factor-one`);
  //
  //   await u.po.signIn.setPassword(fakeUser.password);
  //   await u.po.signIn.continue();
  //
  //   await u.po.expect.toBeSignedIn();
  // });

  // TODO-RETHEME: fix this test
  // test('sign in with hash routing', async ({ page, context }) => {
  //   const u = createTestUtils({ app, page, context });
  //   await u.page.goToRelative('/hash/sign-in');
  //   await u.po.signIn.waitForMounted();
  //
  //   await u.po.signIn.setIdentifier(fakeUser.email);
  //   await u.po.signIn.continue();
  //   await u.page.waitForURL(`${app.serverUrl}/hash/sign-in#/factor-one`);
  //
  //   await u.po.signIn.setPassword(fakeUser.password);
  //   await u.po.signIn.continue();
  //
  //   await u.po.expect.toBeSignedIn();
  // });

  // TODO-RETHEME: fix this test
  // test('user profile from user button navigates correctly', async ({ page, context }) => {
  //   const u = createTestUtils({ app, page, context });
  //   await u.po.signIn.goTo();
  //   await u.po.signIn.waitForMounted();
  //   await u.po.signIn.signInWithEmailAndInstantPassword({ email: fakeUser.email, password: fakeUser.password });
  //   await u.po.expect.toBeSignedIn();
  //
  //   await u.page.goToRelative('/');
  //   await u.page.waitForClerkComponentMounted();
  //
  //   await u.page.getByRole('button', { name: 'Open user button' }).click();
  //
  //   await u.page.getByText(/Manage account/).click();
  //
  //   await u.page.waitForSelector('.cl-modalContent > .cl-userProfile-root', { state: 'attached' });
  //
  //   await u.page.getByText(/Set username/i).click();
  //   await u.page.getByText(/Cancel/i).click();
  //
  //   await u.page.getByText(/Add email address/i).click();
  //   await u.page.getByText(/Cancel/i).click();
  // });
  //
  // test('sign in with path routing navigates to previous page', async ({ page, context }) => {
  //   const u = createTestUtils({ app, page, context });
  //   await u.po.signIn.goTo();
  //   await u.po.signIn.waitForMounted();
  //
  //   await u.po.signIn.getGoToSignUp().click();
  //   await u.po.signUp.waitForMounted();
  //   await u.page.waitForURL(`${app.serverUrl}/sign-up?redirect_url=${encodeURIComponent(app.serverUrl + '/')}`);
  //
  //   await page.goBack();
  //   await u.po.signIn.waitForMounted();
  //   await u.page.waitForURL(`${app.serverUrl}/sign-in`);
  // });
});