
  function geraLetras(nL)    //Sorteia e adiciona as letras que vão cair, controla o tempo que as novas letras aparecerão
  {
    // Letras aleatórias dentro do alfabeto
      var ltr = Math.floor(Math.random() * 120);
      $('.'+nL).css({"top": ltr} )
      for(i = 0; i < nL; i++) //Sorteia letras aleatórias do alfabeto
      {
        nLtr = Math.floor(Math.random() * 25);
        letra = alfabetoBig[nLtr]
        posicao1 = Math.floor(Math.random() * (parseInt(telaW) - 60) + 30)
        $('#divAnimacao').fadeIn().append('<div id="cH'+i+'"class="btn-floating white chaveAnima cH'+i+'"><span class="spancH'+i+'">'+letra+'</span></div>') //Adiciona as letras que caem
        $('.cH'+i).css({"left": posicao1})
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
      posicao2 = Math.floor(Math.random() * (parseInt(telaW) - 60) + 30)
      $('.'+idLetraVal).css({"left": posicao2})

    // Gera corações ou bombas
    item1 = stopProcessLetras = setTimeout(function()
    {
      idLetraVal ++
      $('#divAnimacao').fadeIn().append('<div id="cH'+idLetraVal+'"class="btn-floating white chaveAnima iCoracao cH'+idLetraVal+'" style="border:none; color:none; background-color:none; box-shadow:none"><i class="material-icons iCoracao">favorite</i><span class="spancH'+idLetraVal+'" style="display: none">favorite</span></div>') //Adiciona o item
      posicao3 = Math.floor(Math.random() * (parseInt(telaW) - 60) + 30)
      $('.'+idLetraVal).css({"left": posicao3})  
    }, 5000);
    item2 = stopProcessLetras = setTimeout(function()
      {
        idLetraVal ++
        $('#divAnimacao').fadeIn().append('<div id="cH'+idLetraVal+'"class="btn-floating white chaveAnima .iBomba cH'+idLetraVal+'" style="border:none; color:none; background-color:none; box-shadow:none"><i class="material-icons iBomba ">local_fire_department</i><span class="spancH'+idLetraVal+'" style="display: none">local_fire_department</span></div>') //Adiciona o item
        posicao4 = Math.floor(Math.random() * (parseInt(telaW) - 60) + 30)
        $('.'+idLetraVal).css({"left": posicao4})  
      }, 8000);
  }

  function sortPalChave()  //Sorteia a palavra chave da fase
  {
    var pChave = palavraChave[nFase]
    for(i = 0; i < pChave.length; i++)
    {
      var letra = pChave[i]
      $('#palavraChave').fadeIn().append('<a class="btn-floating btn-medium waves-effect waves-light white pC pC'+letra+'">'+letra+'</a>') //Adiciona a palavra chave da fase atual
      letrasDaChave[i] = letra //Cria uma lista com a letras da palavra sorteada para serem comparadas com as letras pegas pelo jogador
    }
  }

 function movJogadorK()   //Configurações das teclas do teclado habilitadas para o jogo 
  { 
    document.querySelector('body').addEventListener('keydown', function(event)
    {
      tecla = event.which
      if    (tecla == 37)  //Seta esquerda
        {if (horizontal > 15){horizontal -= velox; $('.j1').css({"left": horizontal})}else{$('#divAnimacao').css({"border-left":"solid 5px coral"});var intervalo = window.setTimeout(function() {$('#divAnimacao').css({"border-left":"1px solid gainsboro"})},500)}} 
      else if(tecla == 39) //Seta direita 
        {if(horizontal < (telaW - 70)){horizontal += velox;$('.j1').css({"left": horizontal})}else{$('#divAnimacao').css({"border-right":"solid 5px coral"});var intervalo = window.setTimeout(function() {$('#divAnimacao').css({"border-right":"1px solid gainsboro"})},500)}}
      else if(tecla == 38) //Seta cima
        {if(vertical < 250){vertical += velox; $('.j1').css({"bottom": vertical})}else{$('#divAnimacao').css({"border-top":"solid 5px coral"});   var intervalo = window.setTimeout(function() {$('#divAnimacao').css({"border-top":"1px solid gainsboro"})},500)}} 
      else if(tecla == 40) //Seta baixo 
        {if(vertical > 10){vertical -= velox; $('.j1').css({"bottom": vertical})}else{$('#divAnimacao').css({"border-bottom":"solid 5px coral"}); var intervalo = window.setTimeout(function() {$('#divAnimacao').css({"border-bottom":"1px solid gainsboro"})},500)}}
      //if     (event == 13) {} //Enter               
      //else if(event == 27) {} //ESC
      //R 82 Reiniciar o jogo
      //M 77 Mudar avatar
      //N 78 Mudar nome
      //P 80 Adicionar palavras na lista
    })
  }

  function movJogadorM()   //Configurações do mouse habilitadas para o jogo 
{
  document.querySelector('#divAnimacao').addEventListener('mousemove', function(e) //Movimenta jogador
  {
    mX = e.offsetX;
    mY = e.offsetY;
    console.log('telaY: '+telaH, 'Y: '+mY)
    if(mX > 25 && mX < (telaW - 45))//Move horizontal
    {
      $('.j1').css({"left": mX})
    }
    if(mY > ((telaH / 2)-50) && mY < (telaH - 55))//Move horizontal
    {
      $('.j1').css({"top": mY})
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
      $('div').remove('#'+cH)       //Remove a esfera da tela
      for(iX = 0; iX < letrasDaChave.length; iX++)
      {
        var v2 = letrasDaChave[iX]  //Pega letra dentro da chave
        if      (v1 == v2) //Se a letra coletada (v1) for igual as letras da palavra chave (v2)...
        {
          totalPontos += 3
          $('#pontos').html(totalPontos)
          totalEstrelas ++
          $('#totalEstrelas').html(totalEstrelas)
          velox ++    //Aumenta a velocidade do jogador em 1
          $('#velocidade').html(velox-30)
          $('.j1 img').addClass("pulse green lighten-2")   //Pisca jogador cor verde
          var intervalo = window.setTimeout(function() //Remove pisca 
          {
            $('.j1 img').removeClass("pulse green lighten-2")
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
            $('.lifePanel').append('<i class="material-icons life2 btn-floating white">favorite</i>')
            life ++
            totalEstrelas = estrelas + totalEstrelas
            $('#totalEstrelas').html(totalEstrelas)
            for(iZeraStar = 1; iZeraStar < 6; iZeraStar++)
            {$(".starPanel > i:nth-child("+iZeraStar+")").fadeIn().html('star_border')} //Reseta icones da estrela
          }
          else if(estrelas == 6 && life == 2)
          {
            $('.lifePanel').append('<i class="material-icons life3 btn-floating white">favorite</i>')
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
              $('.j1').css({ "bottom": "10px"})
              $('#circle1').css({ "width": "150px", "height": "150px"})
              while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()}
              $('.vidro, .proxFase, .fim1, .vidro-green-left').show()
              $('.vidro-green-left').css({"width": "15%", "height": "100%"});

              var load = window.setInterval(function()
              {
                $('.load').fadeIn(200)
                $('.load').css({"border-top":"solid 5px rgba(40, 120, 255, 0.6)"});
                setTimeout(() => {$('.load').css({"border-top":"solid 5px #fbc02d"});
                $('.load').css({"border-right":"solid 5px rgba(40, 120, 255, 0.6)"});},100)
                setTimeout(() => {$('.load').css({"border-right":"solid 5px #fbc02d"});
                $('.load').css({"border-bottom":"solid 5px rgba(40, 120, 255, 0.6)"});},250)
                setTimeout(() => { $('.load').css({"border-bottom":"solid 5px #fbc02d"});
                $('.load').css({"border-left":"solid 5px rgba(40, 120, 255, 0.6)"});},400)
                setTimeout(() => { $('.load').css({"border-left":"solid 5px #fbc02d"});},550)
              },550)

              $('.startGame, .fim2, .gameOver').hide()
              clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item1, item2)
              var endLoad1 = window.setTimeout(function() 
              {  
                $('.vidro-green-left').fadeOut(500);
              },6500)
              var endLoad2 = window.setInterval(function() 
              {  
                clearInterval(load);
                $('.fim1, .load').hide()
                $('.fim2').show()
                $('#circle1').css({ "width": "50px", "height": "50px"})
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
              totalPontos = 0
              $('.j1').css({ "bottom": "10px"})
              while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()}
              clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item1, item2);
              $('.startGame, .proxFase, .gameOver').hide()
              $('.vidro, .fimJogo').show()
              for(iFim = 1; iFim <= 10; iFim++)
              {
                $('.fimJogo .row').fadeIn(1000).append('<div class="yellow darken-2 col s1 fimJogoNumPal" style="margin-left: 5.5%;">'+iFim+'</div><div class="btn  light-blue darken-4 fimJogoListaPal col s4">'+palavraChave[iFim]+'</div>')
              }
                $('.fimJogo .row').fadeIn(800).append('<<a href="index.html"><div class="btn black fimJogoAviso col s4 offset-s1" style="margin-left: 5.5%; margin-top: 50px"> Jogue novamente!</div><i class="material-icons medium col s2" style="margin-top: 40px">play_circle</i></a>')
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
            $('.lifePanel').append('<i class="material-icons life2 btn-floating white">favorite</i>')
            $('.lifePanel').append('<i class="material-icons life3 btn-floating white">favorite</i>')
            life += 2
          }
          if(life == 2)
          {
            $('.lifePanel').append('<i class="material-icons life2 btn-floating white">favorite</i>')
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
            life -= 2
          }
          else if(life == 2)
          {
            $('i').remove('.life2')
            $('i').remove('.life1')
            life -= 2
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

          $('.j1 img').addClass("pulse red lighten-2") //Pisca jogador cor vermelho
          var intervalo = window.setTimeout(function()
          {
            $('.j1 img').removeClass("pulse red lighten-2")
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
            $('.j1').css({ "bottom": "10px"})
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
              $('.fim4').fadeIn(500)
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
      if(life == 1)
      { $('.life1').addClass('pulsar')}
      else
      { $('.life1').removeClass('pulsar')}
    }
  }