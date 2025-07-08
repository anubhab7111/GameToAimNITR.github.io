import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-glow-accent">Join Us / Contact</h2>
          <p className="mt-4 text-lg text-muted-foreground">Ready to create? Connect with us through the console.</p>
        </div>
        
        <div className="max-w-4xl mx-auto p-2 border-2 border-accent/30 rounded-lg bg-card box-glow-accent">
          <div className="p-4 bg-card rounded">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span className="w-3 h-3 rounded-full bg-destructive"></span>
              <span className="w-3 h-3 rounded-full bg-tertiary"></span>
              <span className="w-3 h-3 rounded-full bg-accent"></span>
            </div>
            <div className="font-code">
              <p className="text-green-400">&gt; gta_contact --initiate</p>
              <p className="text-green-400">Initializing contact form... Success.</p>
              <p className="text-muted-foreground">Awaiting user input. Please fill out the fields below.</p>
              
              <form className="mt-6 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label htmlFor="name" className="text-accent">&gt; Your Name</label>
                    <Input id="name" type="text" placeholder="unit_42" className="bg-transparent border-accent/50 focus:border-accent font-code text-green-400 mt-1" />
                  </div>
                  <div className="w-full">
                    <label htmlFor="email" className="text-accent">&gt; Your Email</label>
                    <Input id="email" type="email" placeholder="user@domain.net" className="bg-transparent border-accent/50 focus:border-accent font-code text-green-400 mt-1" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="text-accent">&gt; Message</label>
                  <Textarea id="message" placeholder="Load message..." className="bg-transparent border-accent/50 focus:border-accent font-code text-green-400 mt-1 min-h-[120px]" />
                </div>
                <div className="flex justify-end">
                   <Button type="submit" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold">
                     <Send className="mr-2 h-4 w-4" />
                     Transmit Message
                   </Button>
                </div>
              </form>
              <p className="mt-4 text-green-400 flex items-center">
                &gt; <span className="ml-2 w-2 h-4 bg-accent terminal-caret"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
