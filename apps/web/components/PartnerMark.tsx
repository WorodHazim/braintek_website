export function PartnerMark({ name, logoUrl }: { name:string; logoUrl?:string }){
  return <div className={`logo-word${logoUrl?' has-logo':''}`}>{logoUrl?<img src={logoUrl} alt={`${name} logo`} loading="lazy"/>:name}</div>;
}
