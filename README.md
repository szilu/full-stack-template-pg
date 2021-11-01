Minimalistic full stack application template - TypeScript, Rollup, React, Koa
=======================================================================

Description
-----------

*full-stack-template* is a minimalistic full stack application template.
It uses *TypeScript*, *Rollup* for bundling, *React* for UI and *Koa* for backend API.

Commands
--------

    npm run watch-client

Watch source file changes and recompile + bundle client.

    npm run build-client

Build client (production build).

    npm run watch-server

Watch source file changes and recompile server.

    npm run build-server

Build server (production build).

    ./test-server.sh

Run server in development mode (restart on source changes)

Directory structure
-------------------

 * *src*: Sources
     * *client*: Client sources
     * *server*: Server sources
     * *common*: Common sources (eg. common types, validators)
 * *build*: Compiled server application
 * *dist*: Client web root (including client application bundle)
     * *dev.html*: Development HTML (open http://localhost:8000/dev.html)
     * *index.html*: Production HTML
     * *assets-dev*: Assets (development bundle)
     * *assets*: Assets (production bundle)

