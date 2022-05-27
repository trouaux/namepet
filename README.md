# pet: the namepet petname helper

## Core term

The "nametag":

`[(wen ecr) sig exp nom wat dat]`

- `wen`: Time this nametag was seen (added to local db)
- `ecr`: Recovered pubkey from sig
- `sig`: The signature
- `exp`: Expiration timestamp
- `nom`: Petname
- `wat`: Context / metadata
- `dat`: Data

## Config

```
~/.namepet
    yourself.jams
    namepet.sqlite
```

`yourself.jams`

```
{
  selfname  "ali cat"
  privkey   <encrypted private key>
}
```

## Core rule

Only add valid signed nametags

```
add(sig exp nom wat dat) {
  mask = hash(roll( ['namepet nametag' [exp nom wat dat]] ))
  ok ecr = scry(sig, mask)
  need(ok)
  sqlite.add([now ecr sig exp nom wat dat])
}
```

## Command

`pet add` with no arguments reads from stdin. This means you can type
`pet add` and press enter and then paste a raw JAMS formatted
nametag or namecard (list of nametags).

```
pet add
<paste namecard to stdin>
```

`pet get <name>` resolves by `nom`, dumps a JAMS nametag list.

`pet ask <data>` resolves by `wat` and `dat`, dumps a JAMS nametag list.