## Creating an poc Library

Works with @angular/cli@6.1.5

Use Angular Console to create the library with the additional options:
* publishable
* prefix - poc

Copy this file to your local drive and do a global search/replace with project and library names. For example, 
if my project is named "poc", and my project will be in the npm registry as "@poc":


Use this as a guide:  

`import { foo } from 'poc/theme/[secondary-endpoint]'`

'./libs/theme`

Replace the following [ name ] with the appropriate names:  
* libs directory: `theme`
* scope: `poc` 
* library name `theme`
* secondary endpoint `[secondary-endpoint]`

You should end up with an import as

```typescript
import { foo } from '@poc/theme/[secondary-endpoint]';
```


Note: the '@' symbol is already coded, and you don't need to provide it.


### Open `tsconfig.json`

This change is to reference the library as if it's in `node_modules`.  

Change:

```json

"paths": {
     ...
    }
```
    
 To
 
 
```json

"paths": {
      "@poc/theme/*": [
        "libs/theme/*"
      ]
    }
```

### For a library that ONLY has secondary endpoints

In the path `libs/theme`
Open files `ng-package.json` and `ng-package.prod.json`

Remove:

```json

  "lib": {
    "entryFile": "src/public_api.ts"
  },
```

### White list third party libraries
Add:

```json

"whitelistedNonPeerDependencies": ["immutable", "moment"]

```

### Add third party dependencies
Add dependencies:

```bash

yarn add lodash-es@4.17.10
yarn add @types/lodash-es@4.17.0 --dev
yarn add moment@2.22.1
yarn add immutable@3.8.2

```

Optionally, you can add dependencies, or peerDependencies to `projects/poc/fn/package.json`

```json

  "dependencies": {
    "immutable": "3.8.2",
    "moment": "2.22.1"
  },
  
  "peerDependencies": {
      "@angular/cdk": "^6.0.0",
      "@angular/common": "^6.0.0",
      "@angular/core": "^6.0.0",
      "@angular/material": "^6.0.1",
      "rxjs": "^6.1.0",
    }
  
  ```
  


### test

To test secondary endpoints that are not in the `src` directory.

in the file `projects/poc/theme/src/test.ts`

Change:

```typescript
const context = require.context('./', true, /\.spec\.ts$/);
```

to ( only changing '../'):

```typescript
const context = require.context('../', true, /\.spec\.ts$/);
```

