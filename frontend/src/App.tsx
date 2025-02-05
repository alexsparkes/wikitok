import { useEffect, useRef, useCallback, useState } from "react";
import { WikiCard } from "./components/WikiCard";
import { useWikiArticles } from "./hooks/useWikiArticles";
import { Loader2 } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "./components/Header";
import { AboutModal } from "./components/AboutModal";

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const { articles, loading, fetchArticles } = useWikiArticles();
  const observerTarget = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loading) {
        fetchArticles();
      }
    },
    [loading, fetchArticles]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: "100px",
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <Header
        onReload={() => window.location.reload()}
        onToggleAbout={() => setShowAbout(!showAbout)}
      />
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {articles.map((article) => (
        <WikiCard key={article.pageid} article={article} />
      ))}
      <div ref={observerTarget} className="h-10" />
      {loading && (
        <div className="h-screen w-full flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      )}
      <Analytics />
    </div>
  );
}

export default App;
