import { Brand } from "../components/Brand";
import { Seo } from "../components/Seo";

export default function HomePage() {
  return (
    <Seo 
      title="Next Start"
      author="L-Marcel"
      description={"Modelo para projetos que utilizam Next.js." +
      "Para facilitar a produção, deixei o tailwind e o typescript" +
      " — que vejo como necessário — instalados."}
      sharedUrl="https://l-marcel-next-start.vercel.app/"
      ogUrl="https://l-marcel-next-start.vercel.app/og.jpg"
    >
      <main className="home-page-container">
        <Brand/>
        <h1>Next <strong>Start</strong></h1>
        <p>Hello World</p>

        <a 
          href="https://github.com/L-Marcel/next-start"
          target="_blank"
          rel="noreferrer"
        >
          Get Started
        </a>
      </main>
    </Seo>
  );
}