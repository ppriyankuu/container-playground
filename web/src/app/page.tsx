import { Button } from "@/components/ui/button";
import {
  CodeSquare,
  Earth,
  LineChartIcon,
  LockKeyholeIcon,
  RocketIcon,
  TerminalSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full overflow-auto">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32  md:px-10 px-5">
          <div className="md:px-6 dark:bg-black bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] z-20">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-xl px-3 py-1 text-sm bg-cyan-800 font-bold text-white mb-2">
                    Under Beta Testing
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                    Containerized Workspace for Developers
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-md text-justify">
                    Spin up your own Docker-powered workspace with access to a
                    terminal, VS Code, and a web browser. Focus on coding, not
                    infrastructure.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href={"/home"} prefetch={false}>
                    <Button
                      variant={"default"}
                      className="text-bold text-white"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                width={"600"}
                src="placeholder.svg"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted  md:px-10 px-5">
          <div className="space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-xl px-3 py-1 text-sm bg-blue-700 font-bold text-white mb-2">
                  Containerized Workspace
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Tools at Your Fingertips
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access a fully-featured development environment with a
                  terminal, VS Code, and a web browser, all within your own
                  secure Docker container.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-9 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <TerminalSquareIcon className="text-center mx-auto w-9 h-9" />
                <h3 className="text-lg font-bold text-center underline decoration-blue-900">
                  Terminal
                </h3>
                <p className="text-sm text-muted-foreground text-justify">
                  Access a fully-featured terminal to run your commands and
                  manage your project.
                </p>
              </div>
              <div className="grid gap-1">
                <CodeSquare className="text-center mx-auto w-9 h-9" />
                <h3 className="text-lg font-bold text-center underline decoration-blue-800">
                  VS Code
                </h3>
                <p className="text-sm text-muted-foreground text-justify">
                  Develop your code in a familiar IDE, with all the tools and
                  extensions you need.
                </p>
              </div>
              <div className="grid gap-1">
                <Earth className="text-center mx-auto w-9 h-9" />
                <h3 className="text-lg font-bold text-center underline decoration-blue-800">
                  Web Browser
                </h3>
                <p className="text-sm text-muted-foreground text-justify">
                  Test your web application in a secure and isolated
                  environment.
                </p>
              </div>
              <div className="grid gap-1">
                <LockKeyholeIcon className="text-center mx-auto w-9 h-9" />
                <h3 className="text-lg font-bold text-center underline decoration-blue-800">
                  Secure Isolation
                </h3>
                <p className="text-sm text-muted-foreground text-justify">
                  Your development environment is isolated from your local
                  machine, ensuring security and consistency.
                </p>
              </div>
              <div className="grid gap-1">
                <RocketIcon className="text-center mx-auto w-9 h-9" />
                <h3 className="text-lg font-bold text-center underline decoration-blue-800">
                  Instant Setup
                </h3>
                <p className="text-sm text-muted-foreground text-justify">
                  No more time-consuming setup. Just spin up a new container and
                  start coding.
                </p>
              </div>
              <div className="grid gap-1">
                <LineChartIcon className="text-center mx-auto w-9 h-9" />
                <h3 className="text-lg font-bold text-center underline decoration-blue-800">
                  Scalable Infrastructure
                </h3>
                <p className="text-sm text-muted-foreground text-justify">
                  Our infrastructure scales dynamically to meet your needs,
                  ensuring optimal performance.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32  md:px-10 px-5">
          <div className="grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Secure and Scalable
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-justify">
                Your containerized workspace is isolated and secure, with
                automatic scaling to handle your workload.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Container App. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
