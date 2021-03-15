
  function geraLetras(nL)    //Sorteia e adiciona as letras que vão cair, controla o tempo que as novas letras aparecerão
  {
    // Letras aleatórias dentro do alfabeto
      var ltr = Math.floor(Math.random() * 120);
      $('.'+nL).css({"top": ltr} )
      var telaW = $('#divAnimacao').width()
      var posicaoW = nLtr = nLtr = 0
      var letra = ''
      for(i = 0; i < nL; i++) //Sorteia letras aleatórias do alfabeto
      {
        nLtr = Math.floor(Math.random() * 25);
        letra = alfabetoBig[nLtr]
        telaWW = (telaW - parseInt(((telaW * 22)/100)))
        posicaoW = Math.floor(Math.random() * (parseInt(telaWW) - 10) + 10)
        $('#divAnimacao').fadeIn().append('<div id="cH'+i+'"class="btn-floating white chaveAnima cH'+i+'"><span class="spancH'+i+'">'+letra+'</span></div>') //Adiciona as letras que caem
        $('.cH'+i).css({"left": posicaoW})
        nLtr = Math.floor(Math.random() * 120);
        $('.cH'+i).css({"top": nLtr} )
      }
      setTimeout(function()
      {
        $('div').remove('.chaveAnima')
      }, removeLetras);
    // Letra válida gerada em meio às que são do sorteio aleatório
      ltr = Math.floor(Math.random() * (letrasDaChave.length - 0));
      letra = letrasDaChave[ltr]
      idLetraVal = nL
      $('#divAnimacao').fadeIn().append('<div id="cH'+idLetraVal+'"class="btn-floating white chaveAnima cH'+idLetraVal+'"><span class="spancH'+idLetraVal+'">'+letra+'</span></div>') //Adiciona as letras que caem
      posicaoW = Math.floor(Math.random() * (parseInt(telaWW) - 10) + 10)
      $('.'+idLetraVal).css({"left": posicaoW})

    // Gera corações ou bombas
    item1 = stopProcessLetras = setTimeout(function()
    {
      idLetraVal ++
      $('#divAnimacao').fadeIn().append('<div id="cH'+idLetraVal+'"class="btn-floating white chaveAnima iCoracao cH'+idLetraVal+'" style="border:none; color:none; background-color:none; box-shadow:none"><i class="material-icons iCoracao">favorite</i><span class="spancH'+idLetraVal+'" style="display: none">favorite</span></div>') //Adiciona o item
      posicaoW = Math.floor(Math.random() * (parseInt(telaWW) - 10) + 10)
      $('.'+idLetraVal).css({"left": posicaoW})  
    }, 5000);
    item2 = stopProcessLetras = setTimeout(function()
      {
        idLetraVal ++
        $('#divAnimacao').fadeIn().append('<div id="cH'+idLetraVal+'"class="btn-floating white chaveAnima .iBomba cH'+idLetraVal+'" style="border:none; color:none; background-color:none; box-shadow:none"><i class="material-icons iBomba ">local_fire_department</i><span class="spancH'+idLetraVal+'" style="display: none">local_fire_department</span></div>') //Adiciona o item
        posicaoW = Math.floor(Math.random() * (parseInt(telaWW) - 10) + 10)
        $('.'+idLetraVal).css({"left": posicaoW})  
      }, 8000);
  }

  function sortPalChave()  //Sorteia a palavra chave da fase
  {
    var pChave = palavraChave[nFase]
    $('.vidro1').hide()
    for(i = 0; i < pChave.length; i++)
    {
      var letra = pChave[i]
      $('#palavraChave').fadeIn().append('<a class="btn-floating btn-medium waves-effect waves-light white pC pC'+letra+'">'+letra+'</a>') //Adiciona a palavra chave da fase atual
      letrasDaChave[i] = letra //Cria uma lista com a letras da palavra sorteada para serem comparadas com as letras pegas pelo jogador
    }
  }

  function movJogadorK()   //Configurações das teclas do teclado habilitadas para o jogo 
  { 
    var telaW = $('#divAnimacao').width()
    var horizont = (parseInt(telaW) /2)
    var vertical = 10
    document.querySelector('body').addEventListener('keydown', function(event) //Movimenta jogador
    {
      var tecla = event.keyCode;
      if(tecla == 13) {} //Enter               
      else if(tecla == 27) {} //ESC
      
      if(tecla == 37) { //Seta esquerda
        if(horizont > 75){horizont -= velox}
        $('.j1, .j2, .j3').css({"left": horizont})
      } else if(tecla == 39) { //Seta direita
        if (horizont < (telaW - 80)){horizont += velox}
        $('.j1, .j2, .j3').css({"left": horizont})
      }
      if(tecla == 38) { //Seta cima 
        if(vertical < 250){vertical += velox}
        $('.j1, .j2, .j3').css({"bottom": vertical})
      } else if(tecla == 40) { //Seta baixo 
        if(vertical > 10){vertical -= velox}
        $('.j1, .j2, .j3').css({"bottom": vertical})
      }
      //R 82 Reiniciar o jogo
      //M 77 Mudar avatar
      //N 78 Mudar nome
      //P 80 Adicionar palavras na lista
    })
  }

  function movJogadorMouse()   //Configurações do mouse habilitadas para o jogo 
{
  var telaW = $('#divAnimacao').width()
  var vertical = 10
  document.querySelector('#divAnimacao').addEventListener('mousemove', function(e) //Movimenta jogador
  {
    mX = e.offsetX;
    mY = e.offsetY;
    if(mX > 40 && mX < telaW)//Move horizontal
    {
      $('.j1, .j2, .j3').css({"left": mX})
    }
    if(mY > 200 && mY < 380)//Move horizontal
    {
      $('.j1, .j2, .j3').css({"top": mY})
    }     
  })
}

  function comparaListas(_arr1, _arr2) //Compara a lista com as letras coletadas e a lista com a palavra chave
  {

    if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
      return false;

    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();

    for (var i = 0; i < arr1.length; i++) {

        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;

}
  function processaLetras(cH, xj1, yj1, xcH, ycH) //x0 e y0 for menor que 40 o jogador pegou uma letra, decisões são tomadas com base nessa ação
  {
    if(xj1 + 40 > xcH && xj1 < xcH + 40 && yj1 + 40 > ycH && yj1 < ycH + 40) //Verifica se houve colisão em algum lado do jogador: Uma das ações abaixo é executada
    { //Se entrou aqui houve colisão
      var v1 = $('.span'+cH).text() //Pega a letra dentro da esfera
      console.log('Item: ',v1)
      console.log('Life: ',life)
      $('div').remove('#'+cH)       //Remove a esfera da tela
      for(iX = 0; iX < letrasDaChave.length; iX++)
      {
        var v2 = letrasDaChave[iX]  //Pega letra dentro da chave
        if      (v1 == v2) //Se a letra coletada (v1) for igual as letras da palavra chave (v2)...
        {
          totalPontos = 3
          $('#pontos').html(totalPontos)
          totalEstrelas ++
          $('#totalEstrelas').html(totalEstrelas)

          velox ++    //Aumenta a velocidade do jogador em 1
          $('.j1').addClass("pulse green lighten-2")   //Pisca jogador cor verde
          var intervalo = window.setTimeout(function() //Remove pisca 
          {
            $('.j1').removeClass("pulse green lighten-2")
          }, 500);
    
          $('.pC'+v1).removeClass('white');$('.pC'+v1).addClass('blue') //Remove cor branca da palavra chave e adiciona azul para marcar como coletada
          letrasColetadas[iX] = v1 //Adiciona a letra coletada na posição correta desta lista
          if (estrelas > 0 && estrelas < 6) //Adiciona estrelas
          {
            if(estrelas == 0){estrela ++}
            $(".starPanel > i:nth-child("+estrelas+")").fadeIn().html('star') //Muda icone da estrela
            if(estrelas >= 1){estrelas ++} //Adiciona 1 estrela            
          }
          if(estrelas == 6 && life == 1) //Adiciona life se já tiver 5 estrelas. Zera estrelas
          {
            $('.lifePanel').append('<i class="material-icons life2">favorite</i>')
            life ++
            totalEstrelas = estrelas + totalEstrelas
            $('#totalEstrelas').html(totalEstrelas)
            for(iZeraStar = 1; iZeraStar < 6; iZeraStar++)
            {$(".starPanel > i:nth-child("+iZeraStar+")").fadeIn().html('star_border')} //Reseta icones da estrela
          }
          else if(estrelas == 6 && life == 2)
          {
            $('.lifePanel').append('<i class="material-icons life3">favorite</i>')
            life ++
            totalEstrelas = estrelas + totalEstrelas
            $('#totalEstrelas').html(totalEstrelas)
            for(iZeraStar = 1; iZeraStar < 6; iZeraStar++)
            {$(".starPanel > i:nth-child("+iZeraStar+")").fadeIn().html('star_border')} //Reseta icones da estrela
          }
          var fim = comparaListas(letrasColetadas, letrasDaChave); //Compara as letras coletadas com as letras da chave, se todas as letras estiverem coletadas acontece o fim da fase ou do jogo
          if(fim)
          {
            nFase ++
            if(nFase <= 10)
            {
              $('.j1').css({"left":"50%", "transform": "translate(-50%)", "bottom": "10px"})
              while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()}
              $('.vidro, .proxFase, .fim1, .progress').show()
              $('.startGame, .fim2, .gameOver').hide()
              clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item1, item2);
              var intervalo = window.setInterval(function() 
              {  
                $('.fim1, .progress').hide()
                $('.fim2').show()
              }, 7000);
              fim = false
              $('div').remove('.chaveAnima')
              for(iXX = 0; iXX < 20; iXX ++)
              {$('.cH'+iXX).removeClass('white'); $('.cH'+iXX).addClass('red pulse')}
            }
            else
            {
              nFase = 1
              totalEstrelas = 0
              $('.j1').css({"left":"50%", "transform": "translate(-50%)", "bottom": "10px"})
              while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()}
              clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item1, item2);
              $('.startGame, .proxFase, .gameOver').hide()
              $('.vidro, .fimJogo').show()
              for(iFim = 0; iFim <= 10; iFim++)
              {
                $('.fimJogo .row').fadeIn(1000).append('<div class="btn  light-blue darken-4 fimJogoListaPal col s6">'+iFim+'a - '+palavraChave[iFim]+'</div>')
              }
              $('.fimJogo .row').fadeIn(800).append('<div class="btn white col s12><a></a></div>')
                $('.fimJogo .row').fadeIn(800).append('<a href="index.html"><div class="btn black fimJogoAviso col s4"> Jogue novamente!</div><i class="material-icons medium col s2">play_circle</i></a>')
              var intervalo = window.setTimeout(function() 
              {  
              },9000);
              fim = false
              $('div').remove('.chaveAnima')
              for(iXXX = 0; iXXX < 20; iXXX ++)
              {$('.cH'+iXXX).removeClass('white'); $('.cH'+iXXX).addClass('red pulse')}
  
            }
          }
          break
        }
        if (v1 == 'favorite') //Ativa coracao
        {
          $('div').remove('.iCoracao')       //Remove a coração da tela
          if(life == 1)
          {
            $('.lifePanel').append('<i class="material-icons life2">favorite</i>')
            $('.lifePanel').append('<i class="material-icons life3">favorite</i>')
            life = life + 2
          }
          if(life == 2)
          {
            $('.lifePanel').append('<i class="material-icons life2">favorite</i>')
            life ++
          }
          break
        }
        else if (v1 == 'local_fire_department') //Remove bomba
        {
          $('div').remove('.iBomba')       //Remove a bomba da tela
          if(life == 3)
          {
            $('i').remove('.life3')
            $('i').remove('.life2')
            life = life - 2
          }
          else if(life == 2)
          {
            $('i').remove('.life2')
            $('i').remove('.life1')
            life = life - 2
          }
          else if(life == 1)
          {
            $('i').remove('.life1')
            life --
          }
          break
        }
        else if (iX == (letrasDaChave.length - 1)) //Se a letra ou item não corresponder ao nenhuma das opções a cima, um coração é perdido 
        {
          if (estrelas > 0) //Remove estrelas
          {
            $(".starPanel > i:nth-child("+estrelas+")").fadeIn().html('star_border')
          }
          if (estrelas > 1) //Remove estrelas
          {
            estrelas --
          }            

          $('.j1').addClass("pulse red lighten-2") //Pisca jogador cor vermelho
          var intervalo = window.setTimeout(function()
          {
            $('.j1').removeClass("pulse red lighten-2")
          }, 500);

          velox --
          life  --
          if(life == 2)
          {
            $('i').remove('.life3')
          }
          else if(life == 1)
          {
            $('i').remove('.life2')
          }
          else if(life == 0)
          {
            $('i').remove('.life1')

            nFase = 1
            totalEstrelas = 0
            $('.j1').css({"left":"50%", "transform": "translate(-50%)", "bottom": "10px"})
            while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()}
            clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item1, item2);
            $('.proxFase, .startGame, .fim4').hide()
            $('.vidro, .gameOver').show()
            $('.g').fadeToggle(800)
            $('.a').fadeToggle(1600)
            $('.m').fadeToggle(2400)
            $('.e').fadeToggle(3200)
            $('.oo').fadeToggle(4000)
            $('.o').fadeToggle(4800)
            $('.v').fadeToggle(5200)
            $('.e').fadeToggle(6000)
            $('.r').fadeToggle(6800)
            var intervalo = window.setTimeout(function() 
            {  
              $('.fim3').hide()
              $('.fim4').show()
            },9000);
            fim = false
            $('div').remove('.chaveAnima')
            for(iXXX = 0; iXXX < 20; iXXX ++)
            {$('.cH'+iXXX).removeClass('white'); $('.cH'+iXXX).addClass('red pulse')}
          }
          break
        }
        //console.log(letrasColetadas.join())  
      }
    }
  }