import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gold-gradient tracking-tight mb-2">Miracles Studio</h1>
          <p className="text-sm text-zinc-400">Admin Authentication Portal</p>
        </div>
        
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-accent text-zinc-950 font-medium transition-all',
              card: 'bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-2xl',
              headerTitle: 'text-zinc-100',
              headerSubtitle: 'text-zinc-400',
              socialButtonsBlockButton: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700',
              socialButtonsBlockButtonText: 'text-zinc-200',
              formFieldLabel: 'text-zinc-300',
              formFieldInput: 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-primary focus:ring-primary',
              footerActionText: 'text-zinc-400',
              footerActionLink: 'text-primary hover:text-accent font-medium',
            },
          }}
        />
      </div>
    </div>
  );
}
