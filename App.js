import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ALL_QUESTIONS = [
  { q:"Combien de joueurs sur le terrain ?", options:["9","10","11","12"], answer:2, category:"Regles", level:1 },
  { q:"Duree d un match reglementaire ?", options:["80 min","85 min","90 min","95 min"], answer:2, category:"Regles", level:1 },
  { q:"Cartons jaunes pour expulsion ?", options:["1","2","3","4"], answer:1, category:"Regles", level:1 },
  { q:"Distance d un penalty ?", options:["9m","11m","13m","16m"], answer:1, category:"Regles", level:1 },
  { q:"Vainqueur Coupe du Monde 2022 ?", options:["France","Bresil","Argentine","Allemagne"], answer:2, category:"Mondial", level:1 },
  { q:"Pays avec le plus de Coupes du Monde ?", options:["Allemagne","Italie","Argentine","Bresil"], answer:3, category:"Mondial", level:1 },
  { q:"Club le plus titre en Champions League ?", options:["Barca","Bayern","Real Madrid","Man United"], answer:2, category:"Champions", level:1 },
  { q:"Surnom de Messi ?", options:["El Loco","La Pulga","CR7","El Pibe"], answer:1, category:"Legendes", level:1 },
  { q:"Pays du FC Barcelone ?", options:["Portugal","Italie","France","Espagne"], answer:3, category:"Clubs", level:1 },
  { q:"Surnom de Liverpool ?", options:["The Blues","The Reds","The Gunners","The Citizens"], answer:1, category:"Clubs", level:1 },
  { q:"Vainqueur Euro 2024 ?", options:["France","Espagne","Angleterre","Allemagne"], answer:1, category:"Euro", level:1 },
  { q:"Meilleur buteur en Champions League ?", options:["Messi","Cristiano Ronaldo","Raul","Lewandowski"], answer:1, category:"Champions", level:1 },
  { q:"Quel pays a remporte la CAN 2023 ?", options:["Maroc","Nigeria","Cote d Ivoire","Senegal"], answer:2, category:"CAN", level:1 },
  { q:"Vainqueur Champions League 2024 ?", options:["Man City","Bayern","Real Madrid","Arsenal"], answer:2, category:"Champions", level:1 },
  { q:"Surnom de Cristiano Ronaldo ?", options:["CR9","CR7","CR8","CR10"], answer:1, category:"Legendes", level:1 },
  { q:"1ere Coupe du Monde de la France ?", options:["1994","1996","1998","2000"], answer:2, category:"Mondial", level:2 },
  { q:"But de la Main de Dieu en 1986 ?", options:["Pele","Zidane","Maradona","Ronaldo"], answer:2, category:"Mondial", level:2 },
  { q:"Meilleur buteur de l histoire du Mondial ?", options:["Ronaldo","Klose","Pele","Fontaine"], answer:1, category:"Mondial", level:2 },
  { q:"Record de Ballons d Or ?", options:["Cristiano Ronaldo","Lionel Messi","Zidane","Ronaldinho"], answer:1, category:"Legendes", level:2 },
  { q:"Ballon d Or 2023 ?", options:["Mbappe","Haaland","Messi","Vinicius"], answer:2, category:"Legendes", level:2 },
  { q:"Surnom de la Juventus ?", options:["Real","AC Milan","La Vieille Dame","Inter"], answer:2, category:"Clubs", level:2 },
  { q:"Quel pays a remporte la CAN 2021 ?", options:["Ghana","Nigeria","Senegal","Cameroun"], answer:2, category:"CAN", level:2 },
  { q:"Entraineur de Man City lors de la CL 2023 ?", options:["Mourinho","Klopp","Guardiola","Ancelotti"], answer:2, category:"Entraineurs", level:2 },
  { q:"Organisateur du Mondial 2026 ?", options:["Espagne","USA Canada Mexique","Arabie Saoudite","Australie"], answer:1, category:"Mondial", level:3 },
  { q:"Combien de CL pour le Real Madrid ?", options:["12","13","14","15"], answer:3, category:"Champions", level:3 },
  { q:"Quel pays a organise la 1ere Coupe du Monde ?", options:["Bresil","France","Uruguay","Argentine"], answer:2, category:"Mondial", level:3 },
  { q:"Pele a joue pour quel club bresilien ?", options:["Flamengo","Santos","Corinthians","Sao Paulo"], answer:1, category:"Legendes", level:3 },
  { q:"Entraineur ayant gagne 3 CL de suite avec le Real ?", options:["Mourinho","Del Bosque","Ancelotti","Zidane"], answer:3, category:"Entraineurs", level:3 },
  { q:"Quel pays a remporte le plus d Euros ?", options:["France","Allemagne","Espagne","Italie"], answer:2, category:"Euro", level:3 },
  { q:"Meilleur buteur de l histoire de la Serie A ?", options:["Totti","Del Piero","Nordahl","Piola"], answer:3, category:"Records", level:3 },
  { q:"Auteur du but le plus rapide en Mondial ?", options:["Hakan Sukur","Maradona","Pele","Ronaldo"], answer:0, category:"Records", level:3 },
  { q:"Quel pays a remporte la CAN le plus de fois ?", options:["Nigeria","Ghana","Egypte","Cameroun"], answer:2, category:"CAN", level:3 },
  { q:"Gardien vainqueur CL avec Liverpool en 2019 ?", options:["De Gea","Alisson","Ederson","Mendy"], answer:1, category:"Gardiens", level:3 },
  { q:"Entraineur avec le plus de titres en Premier League ?", options:["Wenger","Mourinho","Ferguson","Guardiola"], answer:2, category:"Entraineurs", level:3 },
  { q:"Quel pays a remporte la Copa America 2021 ?", options:["Bresil","Argentine","Uruguay","Colombie"], answer:1, category:"Copa America", level:4 },
  { q:"Entraineur vainqueur CL avec Porto en 2004 ?", options:["Guardiola","Mourinho","Ancelotti","Ferguson"], answer:1, category:"Entraineurs", level:4 },
  { q:"Joueur avec le plus de passes decisives en CL ?", options:["Messi","Ronaldo","Benzema","Xavi"], answer:0, category:"Champions", level:4 },
  { q:"Ballon d Or Feminin 2023 ?", options:["Sam Kerr","Aitana Bonmati","Ada Hegerberg","Alexia Putellas"], answer:1, category:"Foot Feminin", level:4 },
  { q:"Club avec le plus de titres en Liga ?", options:["Barca","Atletico","Real Madrid","Valencia"], answer:2, category:"Championnats", level:4 },
  { q:"Entraineur vainqueur CL avec 3 clubs differents ?", options:["Mourinho","Guardiola","Ancelotti","Heynckes"], answer:2, category:"Entraineurs", level:4 },
  { q:"Record de buts en Liga en une saison ?", options:["48","50","55","60"], answer:1, category:"Records", level:5 },
  { q:"Inventeur du Gegenpressing ?", options:["Guardiola","Klopp","Tuchel","Nagelsmann"], answer:1, category:"Entraineurs", level:5 },
  { q:"Gardien surnomme La Arana Negra ?", options:["Buffon","Casillas","Lev Yachine","Dida"], answer:2, category:"Gardiens", level:5 },
  { q:"Joueur vainqueur CL avec 5 clubs differents ?", options:["Ronaldo","Seedorf","Costacurta","Cafu"], answer:1, category:"Champions", level:5 },
  { q:"Meilleur buteur de l histoire de la Bundesliga ?", options:["Gerd Muller","Lewandowski","Rummenigge","Klose"], answer:0, category:"Records", level:5 },
  { q:"Annee des 13 buts de Just Fontaine en Mondial ?", options:["1954","1958","1962","1966"], answer:1, category:"Records", level:6 },
  { q:"Annee de la defaite 7-1 du Bresil face a l Allemagne ?", options:["2010","2012","2014","2016"], answer:2, category:"Mondial", level:6 },
  { q:"Seul pays present a tous les Mondiaux ?", options:["Bresil","Allemagne","Argentine","Italie"], answer:0, category:"Mondial", level:6 },
  { q:"Entraineur ayant gagne 3 CL consecutives ?", options:["Ferguson","Guardiola","Zidane","Ancelotti"], answer:2, category:"Entraineurs", level:6 },
  { q:"Record de selections en Coupe du Monde ?", options:["Messi","Ronaldo","Lothar Matthaus","Pele"], answer:2, category:"Records", level:6 },
];

const LEVELS = [
  { level:1, name:"Novice", minXP:0, color:"#64748b" },
  { level:2, name:"Amateur", minXP:200, color:"#10b981" },
  { level:3, name:"Semi-Pro", minXP:500, color:"#3b82f6" },
  { level:4, name:"Pro", minXP:1000, color:"#8b5cf6" },
  { level:5, name:"Expert", minXP:2000, color:"#f59e0b" },
  { level:6, name:"Legende", minXP:4000, color:"#ef4444" },
];

const ACCENT = '#f59e0b';
const BG = '#06080f';

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getLevel(xp) { for (let i=LEVELS.length-1;i>=0;i--) { if(xp>=LEVELS[i].minXP) return LEVELS[i]; } return LEVELS[0]; }
function getNextLevel(xp) { const c=getLevel(xp); return LEVELS.find(l=>l.level===c.level+1)||c; }
function getLvPct(xp) { const c=getLevel(xp),n=getNextLevel(xp); if(c.level===n.level) return 100; return Math.round(((xp-c.minXP)/(n.minXP-c.minXP))*100); }

export default function App() {
  const [screen, setScreen] = useState('home');
  const [tab, setTab] = useState('home');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [totalXP, setTotalXP] = useState(350);
  const [sessionXP, setSessionXP] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen==='game' && !answered) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t<=1) { clearInterval(timerRef.current); doAnswer(-1); return 0; }
          return t-1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, current, answered]);

  function startGame() {
    setQuestions(shuffle(ALL_QUESTIONS).slice(0,10));
    setCurrent(0); setScore(0); setStreak(0); setBestStreak(0);
    setSelected(null); setAnswered(false); setTimeLeft(15);
    setCorrect(0); setSessionXP(0); setScreen('game');
  }

  function doAnswer(idx) {
    if (answered) return;
    clearInterval(timerRef.current);
    setSelected(idx); setAnswered(true);
    const q = questions[current];
    const ok = idx===q.answer;
    let xpGain = 0;
    if (ok) {
      const pts = timeLeft>10?150:timeLeft>5?100:75;
      xpGain = Math.round(pts/3);
      setScore(s=>s+pts); setCorrect(c=>c+1); setSessionXP(x=>x+xpGain);
      const ns=streak+1; setStreak(ns); if(ns>bestStreak) setBestStreak(ns);
    } else setStreak(0);
    setTimeout(() => {
      if (current+1>=questions.length) { setTotalXP(p=>p+sessionXP+xpGain); setScreen('result'); }
      else { setCurrent(c=>c+1); setSelected(null); setAnswered(false); setTimeLeft(15); }
    }, 1200);
  }

  function getGrade() {
    const p=correct/questions.length;
    if(p>=0.9) return {label:'LEGENDAIRE',color:'#f59e0b'};
    if(p>=0.75) return {label:'EXPERT',color:'#10b981'};
    if(p>=0.5) return {label:'BON JOUEUR',color:'#3b82f6'};
    return {label:'EN PROGRESSION',color:'#f43f5e'};
  }

  const curLv=getLevel(totalXP), nxtLv=getNextLevel(totalXP), lvPct=getLvPct(totalXP);
  const q=questions[current];
  const tColor=timeLeft>8?'#10b981':timeLeft>4?'#f59e0b':'#f43f5e';

  const LEADERBOARD=[
    {name:'KingFoot',xp:4820},{name:'GoalMachine',xp:3650},
    {name:'UltraFan',xp:2900},{name:'FootballGod',xp:2100},
    {name:'Vous',xp:totalXP,isMe:true},
  ].sort((a,b)=>b.xp-a.xp);

  const S = StyleSheet.create({
    con:{flex:1,backgroundColor:BG},
    tabs:{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'rgba(255,255,255,0.07)',backgroundColor:BG,paddingTop:32},
    tbtn:{flex:1,alignItems:'center',paddingVertical:10},
    ttxt:{fontSize:11,letterSpacing:2,fontWeight:'700'},
    scr:{flex:1,padding:16},
    big:{fontSize:40,color:'#fff',fontWeight:'900',fontStyle:'italic'},
    card:{backgroundColor:'rgba(255,255,255,0.04)',borderLeftWidth:4,borderTopWidth:1,borderRightWidth:1,borderBottomWidth:1,borderTopColor:'rgba(255,255,255,0.07)',borderRightColor:'rgba(255,255,255,0.07)',borderBottomColor:'rgba(255,255,255,0.07)',borderRadius:10,padding:16,marginBottom:12},
    pbtn:{backgroundColor:ACCENT,borderRadius:8,padding:18,alignItems:'center',marginBottom:12},
    ptxt:{fontSize:19,fontWeight:'900',letterSpacing:4,color:'#000'},
    gbtn:{borderWidth:2,borderColor:'rgba(255,255,255,0.15)',borderRadius:8,padding:14,alignItems:'center'},
    mcard:{flexDirection:'row',alignItems:'center',backgroundColor:'rgba(255,255,255,0.03)',borderLeftWidth:3,borderLeftColor:ACCENT,borderTopWidth:1,borderRightWidth:1,borderBottomWidth:1,borderTopColor:'rgba(255,255,255,0.07)',borderRightColor:'rgba(255,255,255,0.07)',borderBottomColor:'rgba(255,255,255,0.07)',borderRadius:10,padding:16,marginBottom:10},
    obtn:{flexDirection:'row',alignItems:'center',borderRadius:8,padding:14,borderLeftWidth:3,borderLeftColor:'transparent',borderTopWidth:1,borderRightWidth:1,borderBottomWidth:1,borderTopColor:'rgba(255,255,255,0.08)',borderRightColor:'rgba(255,255,255,0.08)',borderBottomColor:'rgba(255,255,255,0.08)',backgroundColor:'rgba(255,255,255,0.03)',marginBottom:9},
    sgrid:{flexDirection:'row',gap:8,marginTop:8},
    sbox:{flex:1,backgroundColor:'rgba(255,255,255,0.03)',borderBottomWidth:3,borderBottomColor:ACCENT,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderTopColor:'rgba(255,255,255,0.06)',borderLeftColor:'rgba(255,255,255,0.06)',borderRightColor:'rgba(255,255,255,0.06)',borderRadius:8,padding:12,alignItems:'center'},
    xbar:{height:7,backgroundColor:'rgba(255,255,255,0.07)',borderRadius:3,overflow:'hidden',marginBottom:6},
    xfil:{height:'100%',borderRadius:3},
    lrow:{flexDirection:'row',alignItems:'center',backgroundColor:'rgba(255,255,255,0.02)',borderLeftWidth:4,borderLeftColor:'rgba(255,255,255,0.05)',borderTopWidth:1,borderRightWidth:1,borderBottomWidth:1,borderTopColor:'rgba(255,255,255,0.05)',borderRightColor:'rgba(255,255,255,0.05)',borderBottomColor:'rgba(255,255,255,0.05)',borderRadius:8,padding:13,marginBottom:8},
  });// GAME
  if (screen==='game' && q) return (
    <View style={S.con}>
      <StatusBar barStyle="light-content" backgroundColor={BG}/>
      <ScrollView style={{flex:1,padding:16,paddingTop:44}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <TouchableOpacity onPress={()=>setScreen('home')}>
            <Text style={{color:'#475569',fontWeight:'800',letterSpacing:2,fontSize:13}}>QUITTER</Text>
          </TouchableOpacity>
          <View style={{backgroundColor:'rgba(245,158,11,0.12)',borderRadius:6,paddingHorizontal:12,paddingVertical:4,borderLeftWidth:3,borderLeftColor:ACCENT}}>
            <Text style={{fontSize:11,fontWeight:'800',letterSpacing:2,color:ACCENT}}>{q.category}</Text>
          </View>
          <Text style={{fontSize:20,fontWeight:'900',color:ACCENT}}>{score} pts</Text>
        </View>
        <View style={{flexDirection:'row',gap:3,marginBottom:10}}>
          {questions.map((_,i)=>(
            <View key={i} style={{flex:1,height:4,borderRadius:2,backgroundColor:i<current?'#10b981':i===current?ACCENT:'rgba(255,255,255,0.08)'}}/>
          ))}
        </View>
        <View style={{height:5,backgroundColor:'rgba(255,255,255,0.05)',borderRadius:2,marginBottom:4,overflow:'hidden'}}>
          <View style={{height:'100%',width:`${(timeLeft/15)*100}%`,backgroundColor:tColor,borderRadius:2}}/>
        </View>
        <Text style={{fontSize:56,fontWeight:'900',textAlign:'center',color:tColor,marginBottom:4}}>{timeLeft}</Text>
        {streak>=2 && <Text style={{textAlign:'center',fontSize:14,fontWeight:'800',color:ACCENT,letterSpacing:3,marginBottom:4}}>SERIE x {streak}</Text>}
        <Text style={{textAlign:'center',fontSize:11,fontWeight:'700',color:'#475569',letterSpacing:3,marginBottom:10}}>Question {current+1} / {questions.length}</Text>
        <View style={[S.card,{borderLeftColor:ACCENT}]}>
          <Text style={{fontSize:17,fontWeight:'700',lineHeight:26,color:'#e2e8f0'}}>{q.q}</Text>
        </View>
        {q.options.map((opt,i)=>{
          let bg='rgba(255,255,255,0.03)',blc='transparent',tc='#e2e8f0';
          if(answered){
            if(i===q.answer){bg='rgba(16,185,129,0.12)';blc='#10b981';tc='#10b981';}
            else if(i===selected){bg='rgba(244,63,94,0.12)';blc='#f43f5e';tc='#f43f5e';}
            else tc='#374151';
          }
          return (
            <TouchableOpacity key={i} style={[S.obtn,{backgroundColor:bg,borderLeftColor:blc}]} onPress={()=>doAnswer(i)} disabled={answered}>
              <View style={{width:28,height:28,borderRadius:4,backgroundColor:answered&&i===q.answer?'#10b981':answered&&i===selected?'#f43f5e':'rgba(255,255,255,0.07)',alignItems:'center',justifyContent:'center',marginRight:12}}>
                <Text style={{fontSize:12,fontWeight:'900',color:'#fff'}}>
                  {answered&&i===q.answer?'V':answered&&i===selected&&i!==q.answer?'X':['A','B','C','D'][i]}
                </Text>
              </View>
              <Text style={{fontSize:15,fontWeight:'600',color:tc,flex:1}}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        <View style={{height:40}}/>
      </ScrollView>
    </View>
  );

  // RESULTAT
  if (screen==='result') {
    const grade=getGrade();
    return (
      <View style={[S.con,{justifyContent:'center',alignItems:'center',padding:20}]}>
        <StatusBar barStyle="light-content" backgroundColor={BG}/>
        <Text style={{fontSize:64,marginBottom:8}}>BRAVO</Text>
        <Text style={[S.big,{textAlign:'center',fontSize:30,color:grade.color}]}>{grade.label}</Text>
        <View style={{width:60,height:4,backgroundColor:grade.color,marginVertical:16,borderRadius:2}}/>
        <View style={[S.sgrid,{width:'100%',marginBottom:16}]}>
          {[['SCORE',score+' pts','#f59e0b'],['BONNES',correct+'/'+questions.length,grade.color],['SERIE MAX','x'+bestStreak,'#ef4444']].map(([lbl,val,c])=>(
            <View key={lbl} style={[S.sbox,{borderBottomColor:c}]}>
              <Text style={{fontSize:18,fontWeight:'900',color:c}}>{val}</Text>
              <Text style={{fontSize:9,letterSpacing:1,marginTop:4,color:'#475569'}}>{lbl}</Text>
            </View>
          ))}
        </View>
        <View style={[S.card,{borderLeftColor:ACCENT,width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:20}]}>
          <Text style={{fontSize:12,fontWeight:'800',letterSpacing:2,color:'#94a3b8',marginRight:12}}>XP GAGNE</Text>
          <Text style={{fontSize:28,fontWeight:'900',color:ACCENT}}>{sessionXP}</Text>
          <Text style={{fontSize:12,color:'#475569',marginLeft:12}}>total: {totalXP}</Text>
        </View>
        <View style={{flexDirection:'row',gap:10,width:'100%'}}>
          <TouchableOpacity style={[S.pbtn,{flex:2,marginBottom:0}]} onPress={startGame}>
            <Text style={S.ptxt}>REJOUER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[S.gbtn,{flex:1}]} onPress={()=>{setScreen('home');setTab('home');}}>
            <Text style={{fontSize:14,fontWeight:'900',letterSpacing:2,color:'#94a3b8'}}>HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // TABS
  return (
    <View style={S.con}>
      <StatusBar barStyle="light-content" backgroundColor={BG}/>
      <View style={S.tabs}>
        {[['Home','home'],['Top','leaderboard'],['Profil','profile'],['Contact','contact']].map(([lbl,id])=>(
          <TouchableOpacity key={id} style={S.tbtn} onPress={()=>setTab(id)}>
            <Text style={[S.ttxt,{color:tab===id?ACCENT:'#475569'}]}>{lbl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab==='home' && (
        <ScrollView style={S.scr} showsVerticalScrollIndicator={false}>
          <View style={{alignItems:'center',marginBottom:24}}>
            <View style={{width:90,height:90,borderRadius:24,backgroundColor:ACCENT,alignItems:'center',justifyContent:'center',marginBottom:14}}>
              <Text style={{fontSize:50,color:'#000',fontWeight:'900'}}>FC</Text>
            </View>
            <Text style={S.big}>FOOT CHALLENGE</Text>
            <Text style={{fontSize:11,letterSpacing:7,fontWeight:'700',color:ACCENT,marginTop:6}}>FOOTBALL EDITION</Text>
          </View>
          <View style={[S.card,{borderLeftColor:curLv.color}]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{width:36,height:36,borderRadius:8,backgroundColor:curLv.color,alignItems:'center',justifyContent:'center',marginRight:10}}>
                  <Text style={{fontSize:16,fontWeight:'900',color:'#000'}}>{curLv.level}</Text>
                </View>
                <View>
                  <Text style={{fontSize:16,fontWeight:'800',color:curLv.color,letterSpacing:2}}>{curLv.name}</Text>
                  <Text style={{fontSize:12,color:'#475569'}}>{totalXP} XP</Text>
                </View>
              </View>
              <Text style={{fontSize:12,color:'#475569',fontWeight:'700'}}>{curLv.level<6?nxtLv.name:'MAX'}</Text>
            </View>
            <View style={S.xbar}>
              <View style={[S.xfil,{width:`${lvPct}%`,backgroundColor:curLv.color}]}/>
            </View>
          </View>
          <TouchableOpacity style={S.pbtn} onPress={startGame}>
            <Text style={S.ptxt}>JOUER MAINTENANT</Text>
          </TouchableOpacity>
          {[['Solo','Joue seul et bats ton record'],['Tour par Tour','Joue a ton rythme'],['Soiree','Mode multijoueur festif']].map(([lbl,desc])=>(
            <TouchableOpacity key={lbl} style={S.mcard} onPress={startGame}>
              <View style={{flex:1}}>
                <Text style={{fontSize:15,fontWeight:'800',letterSpacing:2,color:'#e2e8f0'}}>{lbl}</Text>
                <Text style={{fontSize:12,color:'#475569'}}>{desc}</Text>
              </View>
              <Text style={{fontSize:22,fontWeight:'900',color:ACCENT}}>›</Text>
            </TouchableOpacity>
          ))}
          <View style={S.sgrid}>
            {[['Questions',ALL_QUESTIONS.length+''],['XP Total',totalXP+''],['Niveaux','6']].map(([lbl,val])=>(
              <View key={lbl} style={S.sbox}>
                <Text style={{fontSize:20,fontWeight:'900',color:ACCENT}}>{val}</Text>
                <Text style={{fontSize:10,color:'#475569',letterSpacing:1,marginTop:2}}>{lbl}</Text>
              </View>
            ))}
          </View>
          <View style={{height:30}}/>
        </ScrollView>
      )}

      {tab==='leaderboard' && (
        <ScrollView style={S.scr}>
          <Text style={[S.big,{marginBottom:4}]}>Top Players</Text>
          <Text style={{fontSize:11,letterSpacing:5,fontWeight:'700',color:'#475569',marginBottom:20}}>CLASSEMENT</Text>
          {LEADERBOARD.map((p,i)=>{
            const medal=i===0?'1er':i===1?'2e':i===2?'3e':`${i+1}.`;
            return (
              <View key={i} style={[S.lrow,p.isMe&&{backgroundColor:'rgba(245,158,11,0.06)',borderLeftColor:ACCENT}]}>
                <Text style={{fontSize:13,minWidth:26,textAlign:'center',fontWeight:'900',color:'#94a3b8'}}>{medal}</Text>
                <View style={{flex:1,marginLeft:10}}>
                  <Text style={{fontSize:15,fontWeight:'800',color:p.isMe?ACCENT:'#e2e8f0'}}>{p.name}</Text>
                  <Text style={{fontSize:11,color:'#475569'}}>{getLevel(p.xp).name} - {p.xp} XP</Text>
                </View>
                <Text style={{fontSize:16,fontWeight:'900',color:p.isMe?ACCENT:'#475569'}}>{p.xp}</Text>
              </View>
            );
          })}
          <View style={{height:30}}/>
        </ScrollView>
      )}

      {tab==='profile' && (
        <ScrollView style={S.scr}>
          <View style={{alignItems:'center',marginBottom:22}}>
            <View style={{width:70,height:70,borderRadius:35,backgroundColor:curLv.color,alignItems:'center',justifyContent:'center',marginBottom:12}}>
              <Text style={{fontSize:28,color:'#000',fontWeight:'900'}}>{curLv.level}</Text>
            </View>
            <Text style={[S.big,{fontSize:34,textAlign:'center'}]}>Mon Profil</Text>
            <Text style={{fontSize:13,fontWeight:'800',letterSpacing:3,color:curLv.color,marginTop:6}}>{curLv.name} - Niveau {curLv.level}</Text>
          </View>
          <View style={[S.card,{borderLeftColor:curLv.color}]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:8}}>
              <Text style={{fontSize:12,fontWeight:'800',letterSpacing:2,color:'#94a3b8'}}>PROGRESSION XP</Text>
              <Text style={{fontSize:16,fontWeight:'900',color:curLv.color}}>{lvPct}%</Text>
            </View>
            <View style={S.xbar}>
              <View style={[S.xfil,{width:`${lvPct}%`,backgroundColor:curLv.color}]}/>
            </View>
            <Text style={{fontSize:12,color:'#475569'}}>{totalXP} / {curLv.level<6?nxtLv.minXP:'MAX'} XP</Text>
          </View>
          <Text style={{fontSize:11,fontWeight:'800',letterSpacing:4,color:'#475569',marginBottom:10}}>NIVEAUX</Text>
          {LEVELS.map(lv=>{
            const ok=totalXP>=lv.minXP;
            return (
              <View key={lv.level} style={[S.lrow,{borderLeftColor:ok?lv.color:'rgba(255,255,255,0.06)',opacity:ok?1:0.4}]}>
                <View style={{width:32,height:32,borderRadius:8,backgroundColor:ok?lv.color:'rgba(255,255,255,0.06)',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontWeight:'900',fontSize:14,color:ok?'#000':'#475569'}}>{lv.level}</Text>
                </View>
                <View style={{flex:1,marginLeft:10}}>
                  <Text style={{fontSize:15,fontWeight:'800',color:ok?lv.color:'#475569'}}>{lv.name}</Text>
                  <Text style={{fontSize:11,color:'#475569'}}>{lv.minXP} XP requis</Text>
                </View>
                <Text style={{fontSize:14,color:ok?'#10b981':'#475569',fontWeight:'700'}}>{ok?'OK':'--'}</Text>
              </View>
            );
          })}
          <View style={{height:30}}/>
        </ScrollView>
      )}

      {tab==='contact' && (
        <ScrollView style={S.scr}>
          <Text style={[S.big,{marginBottom:4}]}>Contact</Text>
          <Text style={{fontSize:11,letterSpacing:5,fontWeight:'700',color:'#475569',marginBottom:24}}>A VOTRE SERVICE</Text>
          <View style={[S.card,{borderLeftColor:ACCENT}]}>
            <Text style={{fontSize:18,fontWeight:'900',letterSpacing:2,color:ACCENT,marginBottom:4}}>LE BIG BAMBA</Text>
            <Text style={{fontSize:13,color:'#475569',marginBottom:10}}>Createur de l application</Text>
            <Text style={{fontSize:13,color:'#64748b',lineHeight:22,fontStyle:'italic'}}>
              Application creee depuis la Cote d Ivoire pour les passionnes de football du monde entier.
            </Text>
          </View>
          {[['EMAIL','farafinatere@gmail.com','#10b981'],['TELEPHONE','07 49 41 42 65','#3b82f6'],['LOCALISATION','Cote d Ivoire','#f59e0b']].map(([lbl,val,c])=>(
            <View key={lbl} style={[S.card,{borderLeftColor:c,flexDirection:'row',alignItems:'center'}]}>
              <View style={{flex:1}}>
                <Text style={{fontSize:11,fontWeight:'800',letterSpacing:3,color:'#475569',marginBottom:3}}>{lbl}</Text>
                <Text style={{fontSize:15,fontWeight:'700',color:c}}>{val}</Text>
              </View>
            </View>
          ))}
          <Text style={{textAlign:'center',color:'#1e293b',fontSize:11,letterSpacing:2,marginTop:16,fontWeight:'700'}}>
            2025 Le Big Bamba - Cote d Ivoire
          </Text>
          <View style={{height:30}}/>
        </ScrollView>
      )}
    </View>
  );
  }
