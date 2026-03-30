import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Dimensions, TextInput } from 'react-native';

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
  const [player1Name, setPlayer1Name] = useState('Joueur 1');
  const [player2Name, setPlayer2Name] = useState('Joueur 2');
  const [tptPhase, setTptPhase] = useState(1);
  const [tptQuestions1, setTptQuestions1] = useState([]);
  const [tptQuestions2, setTptQuestions2] = useState([]);
  const [tptCurrent, setTptCurrent] = useState(0);
  const [tptScore1, setTptScore1] = useState(0);
  const [tptScore2, setTptScore2] = useState(0);
  const [tptCorrect1, setTptCorrect1] = useState(0);
  const [tptCorrect2, setTptCorrect2] = useState(0);
  const [tptSelected, setTptSelected] = useState(null);
  const [tptAnswered, setTptAnswered] = useState(false);
  const [tptTimeLeft, setTptTimeLeft] = useState(15);
  const [tptTransition, setTptTransition] = useState(false);

  const timerRef = useRef(null);
  const tptTimerRef = useRef(null);

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

  useEffect(() => {
    if (screen==='tpt' && !tptAnswered && !tptTransition) {
      tptTimerRef.current = setInterval(() => {
        setTptTimeLeft(t => {
          if (t<=1) { clearInterval(tptTimerRef.current); doTptAnswer(-1); return 0; }
          return t-1;
        });
      }, 1000);
    }
    return () => clearInterval(tptTimerRef.current);
  }, [screen, tptCurrent, tptAnswered, tptPhase, tptTransition]);

  function startGame() {
    setQuestions(shuffle(ALL_QUESTIONS).slice(0,10));
    setCurrent(0); setScore(0); setStreak(0); setBestStreak(0);
    setSelected(null); setAnswered(false); setTimeLeft(15);
    setCorrect(0); setSessionXP(0); setScreen('game');
  }

  function startTpt() {
    setTptQuestions1(shuffle(ALL_QUESTIONS).slice(0,20));
    setTptQuestions2(shuffle(ALL_QUESTIONS).slice(0,20));
    setTptCurrent(0); setTptScore1(0); setTptScore2(0);
    setTptCorrect1(0); setTptCorrect2(0);
    setTptSelected(null); setTptAnswered(false); setTptTimeLeft(15);
    setTptPhase(1); setTptTransition(false);
    setScreen('tpt');
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
      if (current+1>=questions.length) {
        setTotalXP(p=>p+sessionXP+xpGain);
        setScreen('result');
      } else {
        setCurrent(c=>c+1); setSelected(null); setAnswered(false); setTimeLeft(15);
      }
    }, 1200);
  }

  function doTptAnswer(idx) {
    if (tptAnswered) return;
    clearInterval(tptTimerRef.current);
    setTptSelected(idx); setTptAnswered(true);
    const qs = tptPhase===1 ? tptQuestions1 : tptQuestions2;
    const q = qs[tptCurrent];
    const ok = idx===q.answer;
    if (ok) {
      const pts = tptTimeLeft>10?150:tptTimeLeft>5?100:75;
      if (tptPhase===1) { setTptScore1(s=>s+pts); setTptCorrect1(c=>c+1); }
      else { setTptScore2(s=>s+pts); setTptCorrect2(c=>c+1); }
    }
    setTimeout(() => {
      if (tptCurrent+1>=20) {
        if (tptPhase===1) setTptTransition(true);
        else setScreen('tptresult');
      } else {
        setTptCurrent(c=>c+1);
        setTptSelected(null); setTptAnswered(false); setTptTimeLeft(15);
      }
    }, 1200);
  }

  function startPhase2() {
    setTptPhase(2); setTptCurrent(0);
    setTptSelected(null); setTptAnswered(false); setTptTimeLeft(15);
    setTptTransition(false);
  }

  function getGrade() {
    const p=correct/questions.length;
    if(p>=0.9) return {label:'LEGENDAIRE',color:'#f59e0b',passed:true};
    if(p>=0.75) return {label:'EXPERT',color:'#10b981',passed:true};
    if(p>=0.5) return {label:'BON JOUEUR',color:'#3b82f6',passed:true};
    return {label:'NIVEAU RATE',color:'#f43f5e',passed:false};
  }

  const curLv=getLevel(totalXP), nxtLv=getNextLevel(totalXP), lvPct=getLvPct(totalXP);
  const q=questions[current];
  const tColor=timeLeft>8?'#10b981':timeLeft>4?'#f59e0b':'#f43f5e';
  const tptQ=tptPhase===1?tptQuestions1[tptCurrent]:tptQuestions2[tptCurrent];
  const tptTColor=tptTimeLeft>8?'#10b981':tptTimeLeft>4?'#f59e0b':'#f43f5e';

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
    input:{backgroundColor:'rgba(255,255,255,0.06)',borderRadius:8,padding:14,color:'#fff',fontSize:16,fontWeight:'700',marginBottom:12,borderWidth:1,borderColor:'rgba(255,255,255,0.15)'},
  });

  if (screen==='tptsetup') return (
    <View style={[S.con,{padding:20,justifyContent:'center'}]}>
      <StatusBar barStyle="light-content" backgroundColor={BG}/>
      <Text style={[S.big,{textAlign:'center',marginBottom:6}]}>TOUR PAR TOUR</Text>
      <Text style={{textAlign:'center',fontSize:13,color:'#475569',letterSpacing:3,marginBottom:30}}>20 QUESTIONS CHACUN</Text>
      <Text style={{fontSize:12,fontWeight:'800',letterSpacing:3,color:ACCENT,marginBottom:8}}>NOM JOUEUR 1</Text>
      <TextInput style={S.input} value={player1Name} onChangeText={setPlayer1Name} placeholder="Joueur 1" placeholderTextColor="#475569"/>
      <Text style={{fontSize:12,fontWeight:'800',letterSpacing:3,color:'#3b82f6',marginBottom:8}}>NOM JOUEUR 2</Text>
      <TextInput style={[S.input,{borderColor:'rgba(59,130,246,0.3)'}]} value={player2Name} onChangeText={setPlayer2Name} placeholder="Joueur 2" placeholderTextColor="#475569"/>
      <TouchableOpacity style={[S.pbtn,{marginTop:10}]} onPress={startTpt}>
        <Text style={S.ptxt}>LANCER LE DUEL</Text>
      </TouchableOpacity>
      <TouchableOpacity style={S.gbtn} onPress={()=>setScreen('home')}>
        <Text style={{fontSize:14,fontWeight:'900',color:'#94a3b8',letterSpacing:2}}>RETOUR</Text>
      </TouchableOpacity>
    </View>
  );

  if (screen==='tpt' && tptTransition) return (
    <View style={[S.con,{justifyContent:'center',alignItems:'center',padding:20}]}>
      <StatusBar barStyle="light-content" backgroundColor={BG}/>
      <Text style={{fontSize:60,marginBottom:16}}>BRAVO</Text>
      <Text style={[S.big,{textAlign:'center',color:ACCENT,fontSize:28}]}>{player1Name} a termine !</Text>
      <View style={[S.card,{borderLeftColor:ACCENT,width:'100%',marginTop:20,marginBottom:20}]}>
        <Text style={{fontSize:13,color:'#475569',letterSpacing:2,marginBottom:8}}>SCORE {player1Name.toUpperCase()}</Text>
        <Text style={{fontSize:36,fontWeight:'900',color:ACCENT}}>{tptScore1} pts</Text>
        <Text style={{fontSize:14,color:'#94a3b8',marginTop:4}}>{tptCorrect1} / 20 bonnes reponses</Text>
      </View>
      <Text style={{fontSize:16,fontWeight:'800',color:'#e2e8f0',marginBottom:20,textAlign:'center'}}>Passe le telephone a {player2Name} !</Text>
      <TouchableOpacity style={[S.pbtn,{width:'100%'}]} onPress={startPhase2}>
        <Text style={S.ptxt}>A TOI {player2Name.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );

  if (screen==='tpt' && tptQ && !tptTransition) return (
    <View style={S.con}>
      <StatusBar barStyle="light-content" backgroundColor={BG}/>
      <ScrollView style={{flex:1,padding:16,paddingTop:44}}>
        <View style={{backgroundColor:tptPhase===1?'rgba(245,158,11,0.12)':'rgba(59,130,246,0.12)',borderRadius:8,padding:10,marginBottom:12,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={{fontSize:14,fontWeight:'900',color:tptPhase===1?ACCENT:'#3b82f6',letterSpacing:2}}>{tptPhase===1?player1Name:player2Name}</Text>
          <Text style={{fontSize:14,fontWeight:'900',color:tptPhase===1?ACCENT:'#3b82f6'}}>{tptPhase===1?tptScore1:tptScore2} pts</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <TouchableOpacity onPress={()=>setScreen('home')}><Text style={{color:'#475569',fontWeight:'800',fontSize:12}}>QUITTER</Text></TouchableOpacity>
          <View style={{backgroundColor:'rgba(255,255,255,0.07)',borderRadius:6,paddingHorizontal:10,paddingVertical:3}}>
            <Text style={{fontSize:11,fontWeight:'800',color:'#94a3b8'}}>{tptQ.category}</Text>
          </View>
          <Text s
