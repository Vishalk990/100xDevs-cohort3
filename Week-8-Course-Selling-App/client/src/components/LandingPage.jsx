import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, DollarSign, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { background } from "@/assets";
import Footer from "./Footer";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen bg-white text-gray-900">
        <header className="font-inter px-4 py-6 lg:px-6 h-16 flex items-center justify-between sticky top-0 border-gray-200 bg-white">
          <div className="flex items-center justify-center">
            <BookOpen className="h-7 w-7 mr-2 text-perano-600" />
            <span className="font-bold text-perano-600 tracking-wide text-2xl">
              Learneo
            </span>
          </div>
          <div className="flex items-center justify-center gap-6">
            <Link className="text-sm font-medium hover:text-perano-600 transition-colors cursor-pointer">
              About
            </Link>
            <Button
              variant="outline"
              className="border-perano-400 text-perano-600 hover:bg-perano-50"
              onClick={()=> navigate("/signin")}
            >
              Sign In
            </Button>
            <Button
              className="bg-perano-600 text-white hover:bg-perano-700"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </header>
        <main className="flex-1">
          <div className="mt-16 max-w-2xl mx-auto h-80 bg-custom-bg bg-cover bg-center"></div>
          <section className="w-full py-12 md:py-12 lg:py-24 xl:py-12">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1
                    className="text-3xl font-bold font-nunito tracking-normal sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                inline-block text-transparent bg-clip-text"
                  >
                    Learn and Earn with CourseMarket
                  </h1>
                  <p
                    className="mx-auto max-w-xl text
                -gray-600 md:text-xl font-nunito"
                  >
                    Buy, sell, and create courses on any topic. Join our
                    community of learners and educators today.
                  </p>
                </div>
                <div className="space-x-4 font-inter">
                  <Button
                    size="lg"
                    className="bg-perano-600 text-white hover:bg-perano-700"
                    onClick={() => navigate("/signin")}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-perano-400 text-perano-600 hover:bg-perano-50"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 px-20 md:py-24 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-semibold font-inter sm:text-5xl text-center mb-12">
                Why Choose CourseMarket?
              </h2>
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                <Card className="bg-perano-50 border-perano-200">
                  <CardHeader>
                    <Users className="h-10 w-10 mb-2 text-perano-600" />
                    <CardTitle className="text-perano-600 font-nunito">
                      Learn from Experts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-nunito">
                      Access courses created by industry professionals and
                      subject matter experts.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-perano-50 border-perano-200">
                  <CardHeader>
                    <DollarSign className="h-10 w-10 mb-2 text-perano-600" />
                    <CardTitle className="text-perano-600 font-nunito">
                      Earn by Teaching
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-nunito">
                      Create and sell your own courses, sharing your knowledge
                      with the world.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-perano-50 border-perano-200">
                  <CardHeader>
                    <Award className="h-10 w-10 mb-2 text-perano-600" />
                    <CardTitle className="text-perano-600 font-nunito">
                      Certified Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-nunito">
                      Earn certificates upon course completion to showcase your
                      new skills.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="w-full px-20 py-10 md:py-12 lg:py-8 bg-gray-50">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold font-inter sm:text-5xl text-center mb-12 text-perano-600">
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
                      <CardTitle className="text-perano-600 font-inter">
                        Course Title {i}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 font-nunito">
                        Brief description of the course content and what you'll
                        learn.
                      </p>
                      <p className="font-bold mt-2 text-teal-500 font-nunito">
                        $49.99
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-perano-50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold font-inter sm:text-5xl text-perano-600">
                    Start Learning Today
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl font-nunito">
                    Join thousands of learners and start your journey to
                    success.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2 font-nunito">
                  <form className="flex space-x-2">
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="border-perano-200 focus:ring-perano-400"
                    />
                    <Button
                      type="submit"
                      className="bg-perano-600 text-white hover:bg-perano-700"
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
      </div>
      <Footer />
    </>
  );
}
