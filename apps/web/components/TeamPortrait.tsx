export function TeamPortrait({ name, initials, portraitUrl }: { name:string; initials:string; portraitUrl?:string }){
  return <div className="avatar">{portraitUrl?<img src={portraitUrl} alt={`${name} portrait`} loading="lazy"/>:<span aria-hidden="true">{initials}</span>}</div>;
}
