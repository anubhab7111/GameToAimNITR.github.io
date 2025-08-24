import type { Member, Year } from './types';
import { jax } from './jax';
import { vesper } from './vesper';
import { glitch } from './glitch';
import { vertex } from './vertex';
import { cipher } from './cipher';
import { scribe } from './scribe';
import { drAxiom } from './dr-axiom';
import { byte } from './byte';
import { shard } from './shard';
import { samirKumarMallick } from './samir-kumar-mallick';
import { sumitKumar } from './sumit-kumar';
import { prayasBharadwaj } from './prayas-bharadwaj';
import { animeshTripathy } from './animesh-tripathy';
import { anshumanBehera } from './anshuman-behera';
import { sagarSarangi } from './sagar-sarangi';
import { pitrodaYashLalitbhai } from './pitroda-yash-lalitbhai';
import { mehulBhatia } from './mehul-bhatia';
import { srujanGarnayak } from './srujan-garnayak';
import { shubhamPrakash } from './shubham-prakash';
import { mohitRanjanNaik } from './mohit-ranjan-naik';
import { shaktiPrasadSahoo } from './shakti-prasad-sahoo';
import { sSwagatikaSahoo } from './s-swagatika-sahoo';
import { chinmayVijayKumar } from './chinmay-vijay-kumar';
import { dikeshBhuarya } from './dikesh-bhuarya';
import { omkarAnmolChoudhuary } from './omkar-anmol-choudhuary';
import { rudranshPandey } from './rudransh-pandey';
import { rahulKumarMahato } from './rahul-kumar-mahato';
import { sambitPrakash } from './sambit-prakash';


export const members: Member[] = [
  jax,
  vesper,
  glitch,
  vertex,
  cipher,
  scribe,
  drAxiom,
  byte,
  shard,
  samirKumarMallick,
  sumitKumar,
  prayasBharadwaj,
  animeshTripathy,
  anshumanBehera,
  sagarSarangi,
  pitrodaYashLalitbhai,
  mehulBhatia,
  srujanGarnayak,
  shubhamPrakash,
  mohitRanjanNaik,
  shaktiPrasadSahoo,
  sSwagatikaSahoo,
  chinmayVijayKumar,
  dikeshBhuarya,
  omkarAnmolChoudhuary,
  rudranshPandey,
  rahulKumarMahato,
  sambitPrakash,
].sort((a, b) => {
    // Sort by year descending, then by role to keep a consistent order
    if (a.year !== b.year) {
        return b.year - a.year;
    }
    // A simple role-based order for consistency
    const roleOrder = ['President', 'Vice President', 'Faculty Advisor', 'Lead Programmer', 'Lead 3D Artist', 'Lead Game Designer', 'Lead Writer', 'Code', '3D', 'Web Dev'];
    const aIndex = roleOrder.indexOf(a.role);
    const bIndex = roleOrder.indexOf(b.role);
    if (aIndex !== -1 && bIndex !== -1) {
        if(aIndex !== bIndex) return aIndex - bIndex;
    }
    return a.name.localeCompare(b.name);
});

export const years: Year[] = [...new Set(members.map(m => m.year))].sort((a, b) => b - a) as Year[];
