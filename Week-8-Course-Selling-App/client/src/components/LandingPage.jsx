import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, DollarSign, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <div className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
          <span className="font-bold text-blue-600">Learneo</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="#"
          >
            About
          </div>
        </nav>
        <div className="ml-4 flex gap-2">
          <Button
            variant="outline"
            className="border-blue-400 text-blue-600 hover:bg-blue-50"
          >
            Sign In
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-600">
                  Learn and Earn with CourseMarket
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Buy, sell, and create courses on any topic. Join our community
                  of learners and educators today.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => navigate("/signin")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400 text-blue-600 hover:bg-blue-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 px-20 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-600">
              Why Choose CourseMarket?
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-600">
                    Learn from Experts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access courses created by industry professionals and subject
                    matter experts.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <DollarSign className="h-10 w-10 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-600">
                    Earn by Teaching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Create and sell your own courses, sharing your knowledge
                    with the world.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <Award className="h-10 w-10 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-600">
                    Certified Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Earn certificates upon course completion to showcase your
                    new skills.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full px-20 py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-600">
              Popular Courses
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <img
                    alt="Course thumbnail"
                    className="aspect-video object-cover w-full"
                    height="225"
                    src={`/placeholder.svg?height=225&width=400`}
                    width="400"
                  />
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      Course Title {i}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Brief description of the course content and what you'll
                      learn.
                    </p>
                    <p className="font-bold mt-2 text-teal-500">$49.99</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600">
                  Start Learning Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
                  Join thousands of learners and start your journey to success.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="border-blue-200 focus:ring-blue-400"
                  />
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-600">
          © 2024 CourseMarket. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <div
            className="text-xs hover:text-blue-600 transition-colors"
            href="#"
          >
            Terms of Service
          </div>
          <div
            className="text-xs hover:text-blue-600 transition-colors"
            href="#"
          >
            Privacy
          </div>
        </nav>
      </footer>
    </div>
  );
}
