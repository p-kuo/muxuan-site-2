import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, HelpCircle, Facebook } from "lucide-react";

export default function Contact() {
  const handleBookingClick = () => {
    const locationsSection = document.getElementById('locations');
    if (locationsSection) {
      locationsSection.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('trigger-phone-highlight'));
    }
  };

  return (
    <footer id="contact" className="bg-primary/5 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            立即預約您的草本體驗
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            讓沐璿為您找回頭皮的健康與自信
          </p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              className="h-auto py-6 flex flex-col items-center gap-2 bg-primary hover:bg-primary/90 text-lg"
              onClick={handleBookingClick}
            >
              <Phone className="w-6 h-6" />
              <span>電話預約</span>
            </Button>
            <Button 
              className="h-auto py-6 flex flex-col items-center gap-2 bg-[#00B900] hover:bg-[#00B900]/90 text-white text-lg"
              onClick={() => window.open('https://lin.ee/NxoDqq0', '_blank')}
            >
              <MessageCircle className="w-6 h-6" />
              <span>LINE 加好友</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-6 flex flex-col items-center gap-2 text-lg border-primary/20 text-primary transition-all duration-200 hover:bg-gradient-to-br hover:from-[#1877F2] hover:to-[#4267B2] hover:text-white hover:border-transparent active:from-[#1565C0] active:to-[#365899]"
              onClick={() => window.open('https://www.facebook.com/muherbal', '_blank')}
            >
              <Facebook className="w-6 h-6" />
              <span>Facebook</span>
            </Button>
          </div>
        </div>

        <div className="border-t-2 border-foreground/30 pt-8 text-center text-sm text-foreground/70">
          <p>&copy; {new Date().getFullYear()} 沐璿草本護髮中心 Mu Xuan Herbal Hair Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
