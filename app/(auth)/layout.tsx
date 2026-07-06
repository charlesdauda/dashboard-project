import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";



const Layout = async ({ children }: { children: React.ReactNode }) => {

    const authClient = await auth
    const session = await authClient.api.getSession({ headers: await headers() })
    if (session?.user) redirect('/')



    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
                <Link href= "/"className="auth-logo" >
                <Image src='assets/icons/logo.svg' alt='signalist logo' width={140} height={32} className="h-8 w-auto" />
                </Link>
                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>

            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className="auth-blockquote">
                        Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more 
                        confident making moves in the market
                    </blockquote>
                    <div className="flext items-center justify-between">
                        <div>
                        <cite className="auth-testimonial-author">-Ethan R.</cite>
                        <p className="max-md:text-xs text-gray-500"> Retail Investor</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((star) =>(
                            <Image src='/assets/icons/star.svg' alt ='star' key={star} width={20} height={20} className="w-5 h-5" />
                        ))}
                    </div>
                </div>
                </div>

                <div className="flex-1 relative min-h-105 lg:min-h-170">
                    <div className="auth-dashboard-preview relative h-full w-full overflow-hidden rounded-xl shadow-2xl">
                        <Image
                            src='/assets/images/dashboard.png'
                            alt='Dashboard Preview'
                            fill
                            className='object-cover'
                            sizes='(min-width: 1024px) 55vw, 100vw'
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Layout;