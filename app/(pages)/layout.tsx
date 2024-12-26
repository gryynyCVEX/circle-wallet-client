// Copyright (c) 2024, Circle Technologies, LLC. All rights reserved.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import "../globals.css";

import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Link from "next/link";

import { ClientProviders, Footer } from "@/app/components";
import { Button, Typography } from "@mui/joy";
import { BookOpenIcon } from "@heroicons/react/16/solid";

const inter = Inter({
  subsets: ["cyrillic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div id='__next'>
          <ClientProviders>
            <div className='gradient-background'>
              <div className='mx-auto max-w-7xl background-gradient h-screen flex flex-col lg:flex-row lg:gap-x-8 lg:items-start items-center lg:justify-between justify-center lg:px-8 lg:py-12'>
                {/* Larger Screen Logo */}
                <div className='lg:block hidden w-64'>
                  <Image
                    src={`/CircleLogoWithName.svg`}
                    className='mr-4'
                    alt='Circle Logo'
                    width={140}
                    height={36}
                  />
                  <Typography level='title-lg' className='mt-1'>
                    User-Controlled Wallets
                  </Typography>
                </div>
                <AppContainer>{children}</AppContainer>
                {/* Larger Screen Source Code/Docs */}
                <div className='lg:flex hidden w-64 gap-x-2'>
                  <Link href='/'>
                    <Button variant='outlined'>Home</Button>
                  </Link>
                  <Link href='/onramp'>
                    <Button variant='outlined'>On-Ramp</Button>
                  </Link>
                </div>
              </div>
              <Footer />
            </div>
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}

// Adds top banner/borders for
const AppContainer = ({ children }: { children: React.ReactNode }) => (
  <div className='w-full h-full lg:max-h-[660px] lg:max-w-lg lg:border lg:border-solid border-gray-200 lg:rounded-lg lg:shadow-lg flex flex-col relative overflow-hidden lg:mb-0 mb-20 bg-white'>
    {/* banner for larger screens */}
    <span className='lg:flex hidden bg-secondary text-white p-3 font-medium items-center gap-x-2.5'>
      <Image src={`/CircleLogo.svg`} alt='Circle Logo' width={20} height={20} />{" "}
      Your app here
    </span>
    {/* banner for smaller screens */}
    <div className='lg:hidden p-4 flex justify-between items-center gradient-banner'>
      <span className='flex items-center'>
        <Image
          src={`/CircleLogo.svg`}
          alt='Circle Logo'
          className='invert mr-2'
          width={20}
          height={20}
        />
        <Typography level='title-md' className='inline'>
          User-Controlled Wallets
        </Typography>
      </span>

      <span className='flex gap-x-2'>
        <Link href='/'>
          <Button variant='outlined'>Home</Button>
        </Link>
        <Link href='/onramp'>
          <Button variant='outlined'>On-Ramp</Button>
        </Link>
      </span>
    </div>
    {children}
  </div>
);

export const metadata: Metadata = {
  title: "Programmable Wallet SDK Web Sample App",
  description: "An example of how to use Circle's Programmable Wallet SDK",
};
