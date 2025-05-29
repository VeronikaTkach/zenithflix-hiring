import React from "react";
import { TrendingNow } from "@/components/TrendingNow";
import { WatchHistory } from "@/components/WatchHistory";

const Home: React.FC = () => (
  <main className="p-6 space-y-8">
    <WatchHistory />
    <TrendingNow />
  </main>
);

export default Home;