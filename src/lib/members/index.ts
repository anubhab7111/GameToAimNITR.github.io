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
].sort((a, b) => {
    // Sort by year descending, then by role to keep a consistent order
    if (a.year !== b.year) {
        return b.year - a.year;
    }
    // A simple role-based order for consistency
    const roleOrder = ['President', 'Vice President', 'Faculty Advisor', 'Lead Programmer', 'Lead 3D Artist', 'Lead Game Designer', 'Lead Writer'];
    const aIndex = roleOrder.indexOf(a.role);
    const bIndex = roleOrder.indexOf(b.role);
    if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
    }
    return a.name.localeCompare(b.name);
});

export const years: Year[] = [...new Set(members.map(m => m.year))].sort((a, b) => b - a) as Year[];
