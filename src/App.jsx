import React,{useMemo,useState} from "react";
import {projects,departments} from "./data";
import "./style.css";
export default function App(){
 const [dept,setDept]=useState(null),[mode,setMode]=useState("home"),[q,setQ]=useState("");
 const avg=Math.round(projects.reduce((a,b)=>a+b.progress,0)/projects.length);
 const list=useMemo(()=>{let a=projects;if(dept)a=a.filter(x=>x.dept===dept);if(mode==="critical")a=a.filter(x=>x.priority==="Critical");if(mode==="waiting")a=a.filter(x=>x.status==="Waiting");if(q)a=a.filter(x=>(x.name+x.owner+x.id).toLowerCase().includes(q.toLowerCase()));return a},[dept,mode,q]);
 const open=(m,d=null)=>{setMode(m);setDept(d)};
 return <><header><small>INTERNAL PROJECT SYSTEM</small><h1>PROJECT<br/>CONTROL<br/>CENTER</h1><b>REACT APP • MASTER WRITE-BACK OFF</b></header><main>
 <section className="stats"><K n={projects.length} t="REGISTERED"/><K n={projects.filter(x=>x.priority==="Critical").length} t="CRITICAL"/><K n={projects.filter(x=>x.status==="In Progress").length} t="IN PROGRESS"/><K n={avg+"%"} t="AVG PROGRESS"/></section>
 <nav><button onClick={()=>open("home")}>HOME</button><button onClick={()=>open("critical")}>CRITICAL PATH</button><button onClick={()=>open("waiting")}>WAITING</button><button onClick={()=>open("all")}>ALL PROJECTS</button></nav>
 {mode==="home"&&!dept?<><input className="search" placeholder="ค้นหา Project / Owner" value={q} onChange={e=>setQ(e.target.value)}/><section className="grid">{departments.map(d=>{let a=projects.filter(x=>x.dept===d[0]);return <article key={d[0]} onClick={()=>open("all",d[0])} className={a.some(x=>x.priority==="Critical")?"critical":""}><em>{d[0]}</em><h2>{d[1]}</h2><p>{a.length?a.length+" registered":"RECONCILIATION REQUIRED"}</p><strong>OPEN ›</strong></article>})}</section></>:<ProjectTable list={list} title={dept?departments.find(x=>x[0]===dept)?.[1]:mode==="critical"?"Critical Path":mode==="waiting"?"Waiting / Blocked":"All Projects"} back={()=>{setDept(null);setMode("home")}}/>}
 </main><footer>ALL ABOUT PET • WORKING DRAFT / UNDER RECONCILIATION</footer></>
}
function K({n,t}){return <div><strong>{n}</strong><span>{t}</span></div>}
function ProjectTable({list,title,back}){return <section><div className="top"><h2>{title}</h2><button onClick={back}>← HOME</button></div><table><thead><tr><th>ID / Project</th><th>Priority</th><th>Status</th><th>Progress</th><th>Owner</th><th>Next Action</th></tr></thead><tbody>{list.length?list.map(x=><tr key={x.id}><td><b>{x.id}</b><br/>{x.name}</td><td className={x.priority}>{x.priority}</td><td>{x.status}</td><td>{x.progress}%<i><u style={{width:x.progress+"%"}}/></i></td><td>{x.owner}</td><td>{x.next}</td></tr>):<tr><td colSpan="6">Reconciliation required — ไม่ตีความว่าไม่มีงาน</td></tr>}</tbody></table></section>}
