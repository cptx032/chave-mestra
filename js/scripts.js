
  function geraLetras(nL)    //Sorteia e adiciona as letras que vão cair, controla o tempo que as novas letras aparecerão
  {
    // Letras aleatórias dentro do alfabeto
      for(i = 0; i < nL; i++) //Sorteia letras aleatórias do alfabeto
      {
        nLtr = Math.floor(Math.random() * 28);
        letra = tipoLetra[nLtr]
        $('#divAnimacao').fadeIn().append('<div id="cH'+i+'"class="btn-floating white chaveAnima cH'+i+'"><span class="spancH'+i+'">'+letra+'</span></div>') //Adiciona as letras que caem
        mTop = Math.floor(Math.random() * 120);
        if(letra == "favorite")                  // Gera corações
        {
          $('.cH'+i).addClass('iCoracao')
          $('.cH'+i).css({"border":"none","color":"none","background-color":"none","box-shadow":"none"})
          $('.cH'+i).html('<i class="material-icons">favorite</i><span class="spancH'+i+'" style="display: none">favorite</span>')
        }
        else if(letra == "local_fire_department")// Gera foguinhos
        {
          $('.cH'+i).addClass('iBomba')
          $('.cH'+i).css({"border":"none","color":"none","background-color":"none","box-shadow":"none"})
          $('.cH'+i).html('<i class="material-icons">local_fire_department</i><span class="spancH'+i+'" style="display: none">local_fire_department</span>')
        }
        $('.cH'+i).css({"top": mTop} )
        mLeft = Math.floor(Math.random() * (parseInt(telaW) - 60) + 30)
        $('.cH'+i).css({"left": mLeft})
      }
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
      if(tecla == 39) //Seta direita 
        {if(horizontal < (telaW - 70)){horizontal += velox;$('.j1').css({"left": horizontal})}else{$('#divAnimacao').css({"border-right":"solid 5px coral"});var intervalo = window.setTimeout(function() {$('#divAnimacao').css({"border-right":"1px solid gainsboro"})},500)}}
      if(tecla == 38) //Seta cima
        {if(vertical < 250){vertical += velox; $('.j1').css({"bottom": vertical})}else{$('#divAnimacao').css({"border-top":"solid 5px coral"});   var intervalo = window.setTimeout(function() {$('#divAnimacao').css({"border-top":"1px solid gainsboro"})},500)}} 
      if(tecla == 40) //Seta baixo 
        {if(vertical > 10){vertical -= velox; $('.j1').css({"bottom": vertical})}else{$('#divAnimacao').css({"border-bottom":"solid 5px coral"}); var intervalo = window.setTimeout(function() {$('#divAnimacao').css({"border-bottom":"1px solid gainsboro"})},500)}}
    })
  }

  function movJogadorM()   //Configurações do mouse habilitadas para o jogo 
{
  document.querySelector('#divAnimacao').addEventListener('mousemove', function(e) //Movimenta jogador
  {
    mX = e.offsetX;
    mY = e.offsetY;
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
    for (var i = 0; i < arr1.length; i++) 
    {
      if (arr1[i] !== arr2[i])
        return false;
    }
    return true;
  }
  function processaLetras(cH, xj1, yj1, xcH, ycH) //x0 e y0 for menor que 40 o jogador pegou uma letra, decisões são tomadas com base nessa ação
  {
    if(xj1 + 40 > xcH && xj1 < xcH + 40 && yj1 + 40 > ycH && yj1 < ycH + 40) //Condições que definem a colisão
    { 
      var v1 = $('.span'+cH).text()                   //Pega a letra dentro da esfera
      $('div').remove('#'+cH)                         //Remove a esfera da tela
      if(v1 != 'favorite' && v1 != 'local_fire_department')
      {
        atualizaItens = letrasDaChave.includes(v1)    //Verifica se letra coletada está dentro da palavra chave
        if(atualizaItens)                             //Se a letra correta foi coletada
        {
          for(iX = 0; iX < letrasDaChave.length; iX++)//Percorre a palavra chave para ver se ela contém a letra coletada
          {
            var v2 = letrasDaChave[iX]                //Pega letra dentro da chave
            if(v1 == v2)                              //Se a letra coletada (v1) for igual as letras da palavra chave (v2)...
            {
              $('.j1 img').addClass("pulse green lighten-2")                                         //Pisca jogador cor verde
              window.setTimeout(function(){$('.j1 img').removeClass("pulse green lighten-2")}, 500); //Cor do jogador volta ao transparente
              $('.pC'+v1).removeClass('white');$('.pC'+v1).addClass('green lighten-2')                          //Remove cor branca da palavra chave e adiciona azul para marcar como coletada
              totalPontos += 3
              $('#pontos').html(totalPontos)
              letrasColetadas[iX] = v1
            }
          }  
          totalEstrelas ++                  
          velox ++                               //Aumenta a velocidade do jogador em 1
          $('#totalEstrelas').html(totalEstrelas)
          $('#velocidade').html(velox-30)
          if     (estrelas >=0&&estrelas < 5)    //Adiciona estrelas
          {
            estrelas ++ //Adiciona 1 estrela            
            if     (estrelas == 1){$(".star1").html('star')} //Muda icone para estrela completa
            else if(estrelas == 2){$(".star2").html('star')} //Muda icone para estrela completa
            else if(estrelas == 3){$(".star3").html('star')} //Muda icone para estrela completa
            else if(estrelas == 4){$(".star4").html('star')} //Muda icone para estrela completa
            else if(estrelas == 5){$(".star5").html('star')} //Muda icone para estrela completa
          }
          if(estrelas == 5 && life == 1)    //Se tiver 5 estrelas e 1 vida ganha dois corações. Zera estrelas
          {
            $('.lifePanel').append('<i class="material-icons life2 btn-floating white">favorite</i>')
            life ++
            totalEstrelas = estrelas + totalEstrelas
            $('#totalEstrelas').html(totalEstrelas)
            for(iZeraStar = 0; iZeraStar <=5; iZeraStar++)
            {$(".star"+iZeraStar).html('star_border')} //Reseta icones da estrela
            estrelas = 0
          }
          else if(estrelas == 5 && life == 2)    //Se tiver 5 estrelas e 2 vida ganha um coração. Zera estrelas
          {
            $('.lifePanel').append('<i class="material-icons life3 btn-floating white">favorite</i>')
            life ++
            totalEstrelas = estrelas + totalEstrelas
            $('#totalEstrelas').html(totalEstrelas)
            for(iZeraStar = 0; iZeraStar <=5; iZeraStar++)
            {$(".star"+iZeraStar).html('star_border')} //Reseta icones da estrela
            estrelas = 0
          }
        }
        else                                          //Se a letra coletada não estiver correta um coração é perdido e outras ações são realizadas 
        {
          $('.j1 img').addClass("pulse red lighten-2")                                            //Pisca jogador cor vermelha
          window.setTimeout(function(){$('.j1 img').removeClass("pulse red lighten-2")}, 500);    //Cor do jogador volta ao transparente
          velox --; life -- //Penaliza jogador retirando velocidade e vida
          if     (estrelas >=1&&estrelas < 5)    //Adiciona estrelas
          {
            if     (estrelas == 1){$(".star1").html('star_border')} //Muda icone para estrela completa
            else if(estrelas == 2){$(".star2").html('star_border')} //Muda icone para estrela completa
            else if(estrelas == 3){$(".star3").html('star_border')} //Muda icone para estrela completa
            else if(estrelas == 4){$(".star4").html('star_border')} //Muda icone para estrela completa
            estrelas -- //Remove 1 estrela            
          }
          if     (life == 2)
          {
            $('i').remove('.life3')
          }
          else if(life == 1)
          {
            $('i').remove('.life2')
          }
        }
      }
      else
      {
        if      (v1 == 'favorite')              //Ativa coracao
        {
          $('div').remove('.iCoracao')          //Remove a coração da tela
          if     (life == 1)
          {
            life += 2
            $('.lifePanel').append('<i class="material-icons life2 btn-floating white">favorite</i>')
            $('.lifePanel').append('<i class="material-icons life3 btn-floating white">favorite</i>')
          }
          else if(life == 2)
          {
            life ++
            $('.lifePanel').append('<i class="material-icons life3 btn-floating white">favorite</i>')
          }
        }
        else if (v1 == 'local_fire_department') //Remove coracao
        {
          $('div').remove('.iBomba')            //Remove o foguinho da tela
          if     (life == 3)
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
        }
      }
      fim = comparaListas(letrasColetadas, letrasDaChave);                                  //Compara as letras coletadas com as letras da chave, se todas as letras estiverem coletadas acontece o fim da fase ou do jogo
      if     (life == 1){$('.life1').addClass('pulsar')}else{ $('.life1').removeClass('pulsar')} //SE houver apenas 1 coração ele ficará pulsando e com a cor mais clara.
      if     (life == 0)       //Game over
      {
        $('i').remove('.life1')           //Remove último coração
        $('div').remove('.chaveAnima')    //Remove todas as letras que estão caindo na tela
        $('.j1').css({ "bottom": "10px"}) //Move o jogador para a posição original
        clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item0);clearInterval(item1);clearInterval(item2) //Para o processamento das letras e a gerarção letras e itens que caem
        while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()} //Zera as listras com as letras coletadas e da palavra-chave

        life = 3
        $('.proxFase, .startGame, .fim4, .fim5').hide()
        $('.vidro, .gameOver, .fim3').show()
        $('.g').fadeIn(1200)
        $('.a').fadeIn(2500)
        $('.m').fadeIn(2800)
        $('.e').fadeIn(2600)
        $('.oo').fadeIn(3000)
        $('.o').fadeIn(2100)
        $('.v').fadeIn(1700)
        $('.e').fadeIn(1000)
        $('.r').fadeIn(1900)
        window.setTimeout(function() //Apaga Game over e mostra Tente novamente
        { 
          $('.g').fadeOut(3200)
          $('.a').fadeOut(3500)
          $('.m').fadeOut(3800)
          $('.e').fadeOut(3600)
          $('.oo').fadeOut(3150)
          $('.o').fadeOut(3100)
          $('.v').fadeOut(3700)
          $('.e').fadeOut(3220)
          $('.r').fadeOut(3900)
        },5000);
        window.setTimeout(function() //Apaga Game over e mostra Tente novamente
        { 
          $('.fim3').fadeOut(100)
        },8000);
        window.setTimeout(function() //Apaga Game over e mostra Tente novamente
        { 
          $('.fim4, .fim5').fadeIn(500)
        },8200);
      }   
      else if(fim)             //Fase completa ou jogo completo
      {
        nFase ++
        if     (nFase <= 10)
        {
          $('div').remove('.chaveAnima')    //Remove todas as letras que estão caindo na tela
          $('.j1').css({ "bottom": "10px"}) //Move o jogador para a posição original  
          clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item0);clearInterval(item1);clearInterval(item2);
          while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()}

          $('#circle1').css({ "width": "150px", "height": "150px"})
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
          window.setTimeout(function() 
          {  
            $('.vidro-green-left').fadeOut(500);
          },6500)
          window.setTimeout(function() 
          {  
            clearInterval(load);
            $('.fim1, .load').hide()
            $('.fim2').show()
            $('#circle1').css({ "width": "50px", "height": "50px"})
          }, 6700);
          window.setTimeout(function()
          { 
            $('.chaveIco2').addClass('cadeadoAnima')
          }, 7000);
          window.setTimeout(function()
          { 
            $('.chaveIco2').html('lock_open')
          }, 9000);
        }
        else if(nFase == 11)
        {
          nFase = 1
          totalEstrelas = 0
          totalPontos = 0
          $('.j1').css({ "bottom": "10px"})
          while(letrasDaChave.length){letrasDaChave.pop();letrasColetadas.pop()}
          clearInterval(stopProcessLetras);clearInterval(stopLetras);clearInterval(item0);clearInterval(item1);clearInterval(item2);
          $('.startGame, .proxFase, .gameOver').hide()
          $('.vidro, .fimJogo').show()
          for(iFim = 1; iFim <= 10; iFim++)
          {
            $('.fimJogo .row').fadeIn(1000).append('<div class="yellow darken-2 col s1 fimJogoNumPal" style="margin-left: 5.5%;">'+iFim+'</div><div class="btn  light-blue darken-4 fimJogoListaPal col s4">'+palavraChave[iFim]+'</div>')
          }
            $('.fimJogo .row').fadeIn(800).append('<a href="index.html"><div class="btn black fimJogoAviso col s4 offset-s1" style="margin-left: 5.5%; margin-top: 50px"> Jogue novamente!</div><i class="material-icons medium col s2" style="margin-top: 40px">play_circle</i></a>')        
          $('div').remove('.chaveAnima')
        }
      }
    }
  }
  
  //console.log("Início - Fim: "+fim+"  V1:  "+v1+"  Letras Coletadas:  "+letrasColetadas+"  Letras Chave:  "+letrasDaChave)  
