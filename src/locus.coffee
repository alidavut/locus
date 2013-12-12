class Locus
  @listen: (context)->
    quit = false
    while !quit
      prompt = require('sync-prompt').prompt
      input = prompt('> ').trim()
      try
        if input == 'quit'
          quit = true
        else
          console.log(eval(input))
      catch e
        console.log(e)

global.locus = "(#{Locus.listen.toString()})()"