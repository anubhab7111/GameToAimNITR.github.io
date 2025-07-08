
export default function HeroBackground() {
  const buildings2 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeGaussianBlur stdDeviation='2.5' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:hsl(288, 50%25, 30%25);' /%3E%3Cstop offset='100%25' style='stop-color:hsl(288, 50%25, 15%25);' /%3E%3C/linearGradient%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:hsl(190, 70%25, 40%25);' /%3E%3Cstop offset='100%25' style='stop-color:hsl(190, 80%25, 20%25);' /%3E%3C/linearGradient%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:hsl(288, 83%25, 54%25);' /%3E%3Cstop offset='100%25' style='stop-color:hsl(288, 83%25, 24%25);' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg opacity='0.8'%3E%3C!-- Building 1 --%3E%3Cpath fill='url(%23grad1)' d='M20 400 V 150 H 100 V 400 Z'/%3E%3Crect x='30' y='160' width='60' height='230' fill='hsl(180 100% 50% / 0.1)'/%3E%3C!-- Building 2 --%3E%3Cpath fill='url(%23grad2)' d='M110 400 V 80 H 200 V 400 Z'/%3E%3Cpath fill='hsl(288 83% 10% / 0.5)' d='M115 400 V 85 H 195 V 400 Z'/%3E%3Crect x='125' y='95' width='10' height='10' fill='hsl(46, 100%25, 70%25)' filter='url(%23glow)'/%3E%3Crect x='145' y='95' width='10' height='10' fill='hsl(46, 100%25, 70%25)' filter='url(%23glow)'/%3E%3Crect x='165' y='95' width='10' height='10' fill='hsl(46, 100%25, 70%25)' filter='url(%23glow)'/%3E%3C!-- Building 3 --%3E%3Cpath fill='url(%23grad1)' d='M210 400 V 50 H 320 V 400 Z'/%3E%3Cpath fill='hsl(288 83% 54% / 0.2)' d='M220 400 V 60 H 310 V 400 Z'/%3E%3Crect x='230' y='70' width='80' height='320' fill='hsl(180 100% 50% / 0.1)'/%3E%3Cpath d='M260 50 L 265 40 L 275 40 L 280 50' fill='hsl(46, 100%25, 50%25)' filter='url(%23glow)'/%3E%3C!-- Building 4 --%3E%3Cpath fill='url(%23grad3)' d='M330 400 V 120 H 450 V 400 Z'/%3E%3Crect x='340' y='130' width='100' height='260' fill='hsl(180 100% 50% / 0.15)'/%3E%3C!-- Building 5 --%3E%3Cpath fill='url(%23grad2)' d='M460 400 V 20 H 550 V 400 Z'/%3E%3Cpath fill='hsl(288 83% 10% / 0.5)' d='M465 400 V 25 H 545 V 400 Z'/%3E%3Cpath d='M500 20 L 505 10 L 515 10 L 520 20' fill='hsl(46, 100%25, 50%25)' filter='url(%23glow)'/%3E%3C!-- Building 6 --%3E%3Cpath fill='url(%23grad1)' d='M560 400 V 180 H 650 V 400 Z'/%3E%3Crect x='570' y='190' width='10' height='200' fill='hsl(46, 100%25, 70%25 / 0.5)' filter='url(%23glow)'/%3E%3Crect x='590' y='190' width='10' height='200' fill='hsl(46, 100%25, 70%25 / 0.5)' filter='url(%23glow)'/%3E%3Crect x='610' y='190' width='10' height='200' fill='hsl(46, 100%25, 70%25 / 0.5)' filter='url(%23glow)'/%3E%3C!-- Building 7 --%3E%3Cpath fill='url(%23grad3)' d='M660 400 V 100 L 780 70 V 400 Z'/%3E%3Cpath fill='hsl(288 83% 10% / 0.5)' d='M665 400 V 105 L 775 75 V 400 Z'/%3E%3C/g%3E%3C/svg%3E`;

  const cityLayerStyle = {
    backgroundSize: '100% 100%',
    flexShrink: 0,
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      {/* Sky & Stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2a] to-[#2a0a1a]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,hsl(var(--primary)/0.25)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 stars-bg"></div>
      
      {/* City Layers */}
      <div className="absolute bottom-0 left-0 w-full h-full opacity-70">
        <div className="w-[200%] h-full flex animate-pan-medium">
          <div style={{ ...cityLayerStyle, backgroundImage: `url("${buildings2}")` }} className="w-1/2 h-full"></div>
          <div style={{ ...cityLayerStyle, backgroundImage: `url("${buildings2}")` }} className="w-1/2 h-full"></div>
        </div>
      </div>
      
       {/* Foreground Fog */}
       <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background via-background/80 to-transparent z-20"></div>
    </div>
  );
}
