import { SplashScreen } from "./SplashScreen";
import { HeroSection } from "./HeroSection";
import { LatestProperties } from "./LatestProperties";
import { PropertyChoiceCards } from "./PropertyChoiceCards";
import { WhyChooseUs } from "./WhyChooseUs";

export function HomePage() {
  return (
    <>
      <SplashScreen />
      <main>
        <HeroSection />
        <LatestProperties />
        <PropertyChoiceCards />
        <WhyChooseUs />
      </main>
    </>
  );
}
