/* Pixel marquee and small interactive toppings. Food and portraits are authored raster assets. */
(() => {
  'use strict';
  const glyphs={
    A:['01110','10001','10001','11111','10001','10001','10001'],C:['01111','10000','10000','10000','10000','10000','01111'],E:['11111','10000','10000','11110','10000','10000','11111'],G:['01111','10000','10000','10111','10001','10001','01110'],H:['10001','10001','10001','11111','10001','10001','10001'],I:['111','010','010','010','010','010','111'],N:['10001','11001','11001','10101','10011','10011','10001'],O:['01110','10001','10001','10001','10001','10001','01110'],R:['11110','10001','10001','11110','10100','10010','10001'],S:['01111','10000','10000','01110','00001','00001','11110'],U:['10001','10001','10001','10001','10001','10001','01110'],Y:['10001','10001','01010','00100','00100','00100','00100'],' ':['000','000','000','000','000','000','000']
  };
  function title(canvas){
    const c=canvas.getContext('2d');c.clearRect(0,0,132,44);
    function words(text,y,scale,color,ox,oy){let x=1;for(const letter of text){const g=glyphs[letter];g.forEach((row,j)=>[...row].forEach((v,i)=>{if(v==='1'){c.fillStyle=color;c.fillRect(x+i*scale+ox,y+j*scale+oy,scale,scale);}}));x+=(g[0].length+1)*scale;}}
    words('CHOOSE YOUR',1,2,'#D2DAC1',1,1);words('CHOOSE YOUR',1,2,'#123E2E',0,0);
    words('GARNISH',20,3,'#CE5A39',2,2);words('GARNISH',20,3,'#173E2B',0,0);
  }
  // Each topping is a small color-cluster sprite, drawn on the same fixed pixel grid as the plate.
  const maps={
    cilantro:['  aa  ',' abba ','abbba ',' abba ','  ca  ','  c   '],
    parsley:[' a a  ','abbba ','ababa ',' bba  ','  c   '],
    scallion:[' aaa ','abbba','ab ba',' abb ',' aaa '],
    chili:[' a  ','abba','aba ',' a  '],
    sesame:[' b','ba','a '],
    lemon:['bbb ','  ab',' ba ','bb  ']
  };
  const colors={cilantro:{a:'#295729',b:'#6FA743',c:'#BCD777'},parsley:{a:'#204B2F',b:'#4B8736',c:'#A1C860'},scallion:{a:'#3F7438',b:'#B5CD77'},chili:{a:'#952B20',b:'#ED6334'},sesame:{a:'#B68843',b:'#FFE3A1'},lemon:{a:'#C79D20',b:'#FFE56C'}};
  function topping(c,p){
    const rows=maps[p.id],palette=colors[p.id],x=Math.round(p.x),y=Math.round(p.y),flip=p.flip;
    for(let j=0;j<rows.length;j++)for(let i=0;i<rows[j].length;i++){const color=palette[rows[j][i]];if(color){c.fillStyle=color;c.fillRect(x+(flip?rows[j].length-1-i:i)-2,y+j-2,1,1);}}
  }
  window.CooktGarnishArt={title,topping};
})();
