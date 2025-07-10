import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart } from "lucide-react";
import { checkUser } from "@/lib/checkUser";
const Header =async({isAdminPage=false})=>{
    const user=await checkUser();
    const isAdmin= user?.role=="ADMIN";

    return (
        <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
            <nav className="mx-auto px-2 py-2 flex items-center justify-between">
                <Link href={isAdminPage ? "/admin" : "/"} className="flex">
                <Image src={"/logo.png"}  alt="logo" 
                width={200}
                height={600}
                className="h-14 w-auto object-contain"
                />
                 {isAdminPage && (
            <span className="text-xs font-extralight"></span>
          )}
                </Link>
            <div className="flex items-center space-x-4">
                { isAdminPage ? (
                    <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </Button>
              </Link>
                    ) :(
                    <SignedIn>
                    <Link href="/saved-cars">
                    <Button>
                       <Heart size={18} />
                       <span className="hidden md:inline">
                        Saved Cars
                        </span>
                    </Button>
                    </Link>
                   {!isAdmin ?( <Link href="/reservations">
                    <Button variant='outline'>
                       <CarFront size={18} />
                       <span className="hidden md:inline">
                        My Reservations
                        </span>
                    </Button>
                    </Link> ) :(

                    <Link href="/admin">
                    <Button variant='outline'>
                       <CarFront size={18} />
                       <span className="hidden md:inline">
                        Admin portal
                        </span>
                    </Button>
                    </Link> )}
                    
                </SignedIn>)}
                <SignedOut>
                    <SignInButton forceRedirectUrl="/">
                        <Button variant="outline">
                            Login
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                    appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
              />
                </SignedIn>
            </div>
            </nav>
        </header>
    )
};

export default Header;