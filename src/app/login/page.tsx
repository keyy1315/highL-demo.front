import Header from "@/components/header/header";
import LoginForm from "@/components/login/login-form";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto w-full max-w-7xl md:px-3 py-8">
                <div className="h-[calc(100vh-4rem)] flex items-center justify-center -mt-16">
                    <LoginForm />
                </div>
            </main>
        </div>
    );
}
