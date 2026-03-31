import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, TextInput } from 'react-native';

const ALL_QUESTIONS = [
  { q:"Joueurs sur le terrain ?", options:["9","10","11","12"], answer:2 },
  { q:"Duree match reglementaire ?", options:["80 min","85 min","90 min","95 min"], answer:2 },
  { q:"Cartons jaunes pour expulsion ?", options:["1","2","3","4"], answer:1 },
  { q:"Distance d un penalty ?", options:["9m","11m","13m","16m"], answer:1 },
  { q:"Vainqueur Coupe du Monde 2022 ?", options:["France","Bresil","Argentine","Allemagne"], answer:2 },
  { q:"Pays avec le plus de Coupes du Monde ?", options:["Allemagne","Italie","Argentine","Bresil"], answer:3 },
  { q:"Club le plus titre en Champions League ?", options:["Barca","Bayern","Real Madrid","Man United"], answer:2 },
  { q:"Surnom de Messi ?", options:["El Loco","La Pulga","CR7","El Pibe"], answer:1 },
  { q:"Vainqueur Euro 2024 ?", options:["France","Espagne","Angleterre","Allemagne"], answer:1 },
  { q:"Pays vainqueur CAN 2023 ?", options:["Maroc","Nigeria","Cote d Ivoire","Senegal"], answer:2 }
];

const LVS = ["Amateur 1","Amateur 2","Espoir 1","Espoir 2","Pro 1","Pro 2","Expert 1","Expert 2","Maitre","Legende"];
const ACCENT = '#f59e0b', BG = '#06080f';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [tab, setTab] = useState('home');
  const [qs, setQs] = useState([]);
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState(null);
  const [ans, setAns] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [correct, setCorrect] = useState(0);
  const [lvIdx, setLvIdx] = useState(0);
  const [p1, setP1] = useState('Joueur 1');
  const [p2, setP2] = useState('Joueur 2');
  const [duelP, setDuelP] = useState(1);
  const [s1, setS1] = useState(0);
  const [s2, setS2] = useState(0);
  const tRef = useRef(null);

  useEffect(() => {
    if ((screen==='game' || screen==='duel') && !ans) {
      tRef.current = setInterval(() => {
        setTimer(t => { if (t<=1) { clearInterval(tRef.current); handleAns(-1); return 0; } return t-1; });
      }, 1000);
    }
    return () => clearInterval(tRef.current);
  }, [screen, cur, ans, duelP]);

  const startMode = (m) => {
    setQs([...ALL_QUESTIONS].sort(()=>Math.random()-0.5).slice(0,10));
    setCur(0); setScore(0); setCorrect(0); setAns(false); setTimer(10); setSel(null);
    if(m==='duel'){ setS1(0); setS2(0); setDuelP(1); }
    setScreen(m);
  };

  const handleAns = (i) => {
    if (ans) return;
    clearInterval(tRef.current); setSel(i); setAns(true);
    const isOk = i === qs[cur].answer;
    if (isOk) {
      const pts = timer * 10;
      if (screen==='duel') { duelP===1 ? setS1(s=>s+pts) : setS2(s=>s+pts); }
      else { setScore(s=>s+pts); setCorrect(c=>c+1); }
    }
    setTimeout(() => {
      if (cur < 9) { setCur(c=>c+1); setAns(false); setTimer(10); setSel(null); }
      else {
        if (screen==='duel' && duelP===1) {
          setDuelP(2); setCur(0); setAns(false); setTimer(10); setSel(null);
          setQs([...ALL_QUESTIONS].sort(()=>Math.random()-0.5).slice(0,10));
        } else {
          if (screen==='game' && correct >= 4 && isOk && lvIdx < 9) setLvIdx(l=>l+1);
          setScreen(screen==='duel'?'duelRes':'result');
        }
      }
    }, 1000);
  };

  const S = StyleSheet.create({
    con:{flex:1,backgroundColor:BG},
    scr:{flex:1,padding:20,paddingTop:50},
    big:{fontSize:28,color:'#fff',fontWeight:'900',fontStyle:'italic',marginBottom:20},
    card:{backgroundColor:'rgba(255,255,255,0.05)',borderRadius:12,padding:20,marginBottom:15},
    btn:{backgroundColor:ACCENT,borderRadius:10,padding:18,alignItems:'center',marginBottom:10},
    txt:{fontSize:16,fontWeight:'bold',color:'#000'},
    q:{fontSize:20,color:'#fff',fontWeight:'800',textAlign:'center',marginVertical:30},
    opt:{width:'100%',padding:16,borderRadius:10,backgroundColor:'rgba(255,255,255,0.07)',marginBottom:10,borderWidth:1},
    tabB:{flexDirection:'row',marginBottom:20},
    tbtn:{flex:1,alignItems:'center',padding:10,borderBottomWidth:2}
  });

  return (
    <View style={S.con}>
      <StatusBar barStyle="light-content" />
      {screen === 'home' && (
        <View style={S.scr}>
          <View style={S.tabB}>
            <TouchableOpacity style={[S.tbtn,{borderBottomColor:tab==='home'?ACCENT:'transparent'}]} onPress={()=>setTab('home')}><Text style={{color:'#fff'}}>JEU</Text></TouchableOpacity>
            <TouchableOpacity style={[S.tbtn,{borderBottomColor:tab==='prof'?ACCENT:'transparent'}]} onPress={()=>setTab('prof')}><Text style={{color:'#fff'}}>PROFIL</Text></TouchableOpacity>
          </View>
          {tab==='home'?(
            <View>
              <Text style={S.big}>FOOT CHALLENGE</Text>
              <TouchableOpacity style={S.btn} onPress={()=>startMode('game')}><Text style={S.txt}>SOLO (NIVEAU {lvIdx+1})</Text></TouchableOpacity>
              <TouchableOpacity style={[S.btn,{backgroundColor:'#3b82f6'}]} onPress={()=>setScreen('setup')}><Text style={S.txt}>MODE DUEL</Text></TouchableOpacity>
            </View>
          ):(
            <ScrollView>
              <View style={S.card}><Text style={{color:ACCENT,fontWeight:'900'}}>RANG: {LVS[lvIdx]}</Text></View>
              <View style={S.card}><Text style={{color:'#fff'}}>Le Big Bamba - CI</Text><Text style={{color:'#94a3b8'}}>farafinatere@gmail.com</Text></View>
            </ScrollView>
          )}
        </View>
      )}
      {screen==='setup' && (
        <View style={[S.scr,{justifyContent:'center'}]}>
          <TextInput style={S.card} placeholder="Joueur 1" placeholderTextColor="#666" onChangeText={setP1} color="#fff" />
          <TextInput style={S.card} placeholder="Joueur 2" placeholderTextColor="#666" onChangeText={setP2} color="#fff" />
          <TouchableOpacity style={S.btn} onPress={()=>startMode('duel')}><Text style={S.txt}>COMMENCER</Text></TouchableOpacity>
        </View>
      )}
      {(screen==='game' || screen==='duel') && qs[cur] && (
        <View style={S.scr}>
          <Text style={{color:ACCENT,textAlign:'center',fontSize:24,fontWeight:'900'}}>{timer}s</Text>
          <Text style={S.q}>{qs[cur].q}</Text>
          {qs[cur].options.map((o,i)=>(
            <TouchableOpacity key={i} style={[S.opt,{borderColor:ans?i===qs[cur].answer?'#10b981':i===sel?'#ef4444':'transparent':'transparent'}]} onPress={()=>handleAns(i)}>
              <Text style={{color:'#fff',textAlign:'center'}}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {(screen==='result' || screen==='duelRes') && (
        <View style={[S.scr,{justifyContent:'center'}]}>
          <Text style={S.big}>FIN DE PARTIE</Text>
          <TouchableOpacity style={S.btn} onPress={()=>setScreen('home')}><Text style={S.txt}>RETOUR MENU</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
    }
  
