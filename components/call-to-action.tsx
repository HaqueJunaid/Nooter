import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <h2 className="text-balance text-4xl m font-semibold lg:text-5xl">Start Writing</h2>
                    <p className="mt-4 max-w-xl mx-auto">Join thousands of users who are already organizing their thoughts and capturing their ideas with our powerful note-taking platform.</p>

                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/dashboard">
                                <span>Get Started</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}