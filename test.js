import { test } from 'tapzero'
import { sign, hash, roll, scry } from './coreword/dist/word.js'
import { make, create, add } from './namepet.js'
import RLP from 'rlp'

const sk = new Uint8Array([
   23,  89, 219, 209, 132,  45,  21, 232,
   29,  42, 242,  26,  81,   8, 224, 185,
   29,  29, 186, 174,  27, 109, 159,  61,
  199, 243, 147,  65, 164,  55, 142,  80
])

test('make then create', t => {
    const db = make()
    t.ok(db)
    t.ok(create(db))
    t.throws(
        _ => create(db),
        /table namepet already exists/,
        "should throw on 2nd create"
    )
})

test('double make resets db', t => {
  var db = make()
  t.ok(create(db))
  t.ok(db.prepare('SELECT 1 FROM namepet').all())
  t.ok(db = make())
  t.throws(
    _ => db.prepare('SELECT 1 FROM namepet').all()
  )
})

test('rlp integer encode', t => {
  const exp     = 1024
  const exphex  = exp.toString(16)
  const expb    = Buffer.from(exphex.length % 2 === 0 ? exphex : '0' + exphex, 'hex')
  const encoded = roll(expb)
  t.equal(parseInt(RLP.decode( encoded ).toString('hex'), 16), exp)
})

test('add', async t => {
  const db     = make()
  create(db)
  const exp    = 1654585421
  const exphex = exp.toString(16)
  const expb   = Buffer.from(exphex.length % 2 === 0 ? exphex : '0' + exphex, 'hex')
  const nom    = Buffer.from("Vitalik's DAI address (found from https://ethresear.ch)")
  const wat    = Buffer.from('https://ethresear.ch/u/vbuterin')
  const dat    = Buffer.from(":free:ethresearch:donation:vitalik:dai")
  const mask   = hash(roll( ['namepet nametag', [expb, nom, wat, dat]] ))
  const sig    = await sign(mask, sk)
  add(db, sig, exp, nom, wat, dat)

  const all = db.prepare('SELECT * FROM namepet').all()
  t.equal(all.length, 1)
  t.equal(typeof all[0].wen, 'number')
  t.deepEqual(all[0].ecr, scry(mask, sig))
  t.deepEqual(all[0].sig, sig)
  t.deepEqual(all[0].exp, exp)
  t.deepEqual(all[0].nom, nom)
  t.deepEqual(all[0].wat, wat)
  t.deepEqual(all[0].dat, dat)
})
