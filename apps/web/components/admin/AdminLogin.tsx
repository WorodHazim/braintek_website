'use client';
import { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import styles from './AdminLogin.module.css';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const response = await fetch('/api/admin/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Unable to sign in.');
      window.location.assign('/admin');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to sign in.'); setLoading(false);
    }
  }

  return <div className={styles.viewport} data-braintek-admin-root>
    <div className={styles.grid} />
    <section className={styles.copy}>
      <img src="/brand/braintek-logo.png" alt="BrainTek" />
      <p>Secure operational access</p>
      <h1>Manage the work behind the website.</h1>
      <span>Inquiries, follow-ups, status history and content oversight in one BRAINTEK workspace.</span>
      <div><ShieldCheck size={17}/> Uses your existing Strapi administrator credentials</div>
    </section>
    <form className={styles.card} onSubmit={submit}>
      <p>BRAINTEK ADMIN</p><h2>Sign in.</h2><span>Use the same email and password you use at localhost:1337/admin.</span>
      <label>Email<div><Mail size={16}/><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username" /></div></label>
      <label>Password<div><LockKeyhole size={16}/><input type={show?'text':'password'} required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/><button type="button" onClick={()=>setShow(v=>!v)}>{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>
      {error ? <div className={styles.error}>{error}</div> : null}
      <button className={styles.submit} type="submit" disabled={loading}>{loading?'Authenticating…':'Enter dashboard'}<i><ArrowRight size={16}/></i></button>
      <a href="http://localhost:1337/admin" target="_blank" rel="noreferrer">Open Strapi CMS instead</a>
    </form>
  </div>;
}
