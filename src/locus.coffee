global.locus_variables ?= {}
global.locus_variables.modules ?= {}
global.locus_variables.modules.sync_prompt = require.resolve('sync-prompt')

class Locus
  @listen: ->
    quit = false
    while !quit
      prompt = require(locus_variables.modules.sync_prompt).prompt
      input = prompt('> ').trim()
      try
        if input == 'quit' || input == 'exit'
          quit = true
        else
          console.log(eval(input))
      catch e
        console.log(e)

global.locus = "(#{Locus.listen.toString()}).call(this)"
