import Header from "@/components/header";
import MainApp from "@/components/main-app";
import MultipleTabs from "@/components/multiple-tabs";

export default function Home() {
  return (
    <main className="container">
      <Header />
      <MultipleTabs />
      <MainApp />
    </main>
  );
}
