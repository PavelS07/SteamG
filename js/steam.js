$(document).ready(function(){

  // parseFloat(().toFixed(4));

  // Define input variable inputVar['WsupR1'], AsupR1, SsubR1, SsubO1, SsupR1, CsupR1, HsupR1, NsupR1, OsupR1, QsubLower1

  var inputVar = {};

  // Calculations output variable inputVar['WsupR2'], AsupR2, SsubR2, SsubO2, SsupR2, CsupR2, HsupR2, NsupR2, OsupR2, QsubLower2

  var outputVar = {};

  // Calculations variable composition

  var Composition1, Composition2;

  // Calculations variable Volumes Air And Products

  var Volume = {};

  // Values of alpha, Rp

  var Alpha = [1.2, 1.23, 1.25, 1.28], massiveRp = [], massiveVolumeg = [];

  // Values of Enthalpy and H

  var EnthalpyCO2 = [], EnthalpyN2 = [], EnthalpyH2O = [], EnthalpyAir = [], EnthalpyAsh = [], EnthalpyH = {}, EnthalpyHforAlpha1 = [], EnthalpyHforAlpha2 = [], EnthalpyHforAlpha3 = [], EnthalpyHforAlpha4 = [];

  // Define input variable CHAMBER

  var inputVarCham = {};

  // Define output variable CHAMBER

  var outputVarCham = {};

  // Define input variable SCREENS

  var inputVarScreen = {};

  // Define output variable SCREENS

  var outputVarScreen  = {};

  // Define input variable HOTSTEP

  var inputVarHotS = {};

  // Define output variable HOTSTEP

  var outputVarHotS  = {};

  // Define input variable COLDSTEP

  var inputVarColdS = {};

  // Define output variable COLDSTEP

  var outputVarColdS  = {};

  // Define input variable Economizer2

  var inputVarEco2 = {};

  // Define output variable Economizer2

  var outputVarEco2 = {};

  // Define input variable AirHeater2

  var inputVarAH2 = {};

  // Define output variable AirHeater2

  var outputVarAH2 = {};

  // Define input variable Economizer1

  var inputVarEco1 = {};

  // Define output variable Economizer1

  var outputVarEco1 = {};

  // Define input variable AirHeater2

  var inputVarAH1 = {};

  // Define output variable AirHeater2

  var outputVarAH1 = {};

  // Function error

  function Error(){
    $('.error').hide();
    $('.button-area').prepend('<div class="error animated flipInX" align="center">Укажите число!</div>');
  }

  $('.okfuelRecalculation').on('click', function(){

    inputVar['WsupR1'] = parseFloat($('#WsupR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['AsupR1'] = parseFloat($('#AsupR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['SsubR1'] = parseFloat($('#SsubR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['SsubO1'] = parseFloat($('#SsubO').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['SsupR1'] = parseFloat($('#SsupR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['CsupR1'] = parseFloat($('#CsupR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['HsupR1'] = parseFloat($('#HsupR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['NsupR1'] = parseFloat($('#NsupR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['OsupR1'] = parseFloat($('#OsupR').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['WsupR2'] = parseFloat($('#WsupR2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVar['AsupR2'] = parseFloat($('#AsupR2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

    if(inputVar['WsupR1'] == 9711271415 && !inputVar['AsupR1'] && !inputVar['SsubR1'] && !inputVar['SsubO1'] && !inputVar['SsupR1'] && !inputVar['CsupR1']){

      $('body').addClass('bg');
      $('.fuelRecalculation').addClass('animated fadeOutRight').hide().show();
      $('.okfuelRecalculation').addClass('animated fadeOutRight').hide().show();

      $('body').prepend("<div class='ms'><h1 style='color:white;'>Даша Маслова самая умная, красивая и добрая девушка во всем мире!</h1></div>").hide().fadeIn(2000);


      return false;
    }

    // Class recalculation fuel
    function fuelRecalculation(pH1 = 'WsupR2', pH2 = 'AsupR2', pH3 = 'AsupR1', pH4 = 'WsupR1'){
      outputVar[pH2] = parseFloat((inputVar[pH3]*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));
      outputVar['SsubR2'] = parseFloat((inputVar['SsubR1']*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));
      outputVar['SsubO2'] = parseFloat((inputVar['SsubO1']*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));
      outputVar['CsupR2'] = parseFloat((inputVar['CsupR1']*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));
      outputVar['HsupR2'] = parseFloat((inputVar['HsupR1']*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));
      outputVar['NsupR2'] = parseFloat((inputVar['NsupR1']*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));
      outputVar['OsupR2'] = parseFloat((inputVar['OsupR1']*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));

      Composition1 = parseFloat((inputVar['WsupR1'] + inputVar['AsupR1'] + inputVar['SsubR1'] + inputVar['SsubO1'] + inputVar['CsupR1'] + inputVar['HsupR1'] + inputVar['NsupR1'] + inputVar['OsupR1']).toFixed(4));
      Composition2 = parseFloat((inputVar[pH1] + outputVar[pH2] + outputVar['SsubR2'] + outputVar['SsubO2'] + outputVar['CsupR2'] + outputVar['HsupR2'] + outputVar['NsupR2'] + outputVar['OsupR2']).toFixed(4));

      if(pH1 == 'WsupR2') var place1 = inputVar['WsupR2'], place2 = outputVar['AsupR2'];
      else var place1 = outputVar['WsupR2'], place2 = inputVar['AsupR2'];

      var html = "<div class='animated zoomIn'>"+
      "<p class='part' align='center'>1</p>"+
      "<p>Первоначальный состав топлива: ∑x ="+Composition1+"%</p>"+
      "<p>Новый состав топлива: ∑x ="+Composition2+"%</p>"+
      "<ul><li><span>W<sub>2</sub><sup>r</sup> = "+place1+"%</span></li>"+
      "<li><span>A<sub>2</sub><sup>r</sup> = "+place2 +"%</span></li>"+
      "<li><span>S<sub>р2</sub><sup>r</sup> = "+outputVar['SsubR2']+"%</span></li>"+
      "<li><span>S<sub>o2</sub><sup>r</sup> = "+outputVar['SsubO2']+"%</span></li>"+
      "<li><span>C<sub>2</sub><sup>r</sup> = "+outputVar['CsupR2']+"%</span></li>"+
      "<li><span>H<sub>2</sub><sup>r</sup> = "+outputVar['HsupR2']+"%</span></li>"+
      "<li><span>N<sub>2</sub><sup>r</sup> = "+outputVar['NsupR2']+"%</span></li>"+
      "<li><span>O<sub>2</sub><sup>r</sup> = "+outputVar['OsupR2']+"%</span></li>"+"</ul></div>";

      if(inputVar['SsupR1']){

          outputVar['SsupR2'] = parseFloat((inputVar['SsupR1']*((100-inputVar[pH1])/(100-inputVar[pH4]))).toFixed(4));

          Composition1 = parseFloat((inputVar['WsupR1'] + inputVar['AsupR1'] + inputVar['SsupR1'] + inputVar['CsupR1'] + inputVar['HsupR1'] + inputVar['NsupR1'] + inputVar['OsupR1']).toFixed(4));
          Composition2 = parseFloat((inputVar[pH1] + outputVar[pH2] + outputVar['SsupR2'] + outputVar['CsupR2'] + outputVar['HsupR2'] + outputVar['NsupR2'] + outputVar['OsupR2']).toFixed(4));

          var html = "<div class='animated zoomIn'>"+
          "<p class='part' align='center'>1</p>"+
          "<p>Первоначальный состав топлива: ∑x ="+Composition1+"%</p>"+
          "<p>Новый состав топлива: ∑x ="+Composition2+"%</p>"+
          "<ul><li><span>W<sub>2</sub><sup>r</sup> = "+place1+"%</span></li>"+
          "<li><span>A<sub>2</sub><sup>r</sup> = "+place2+"%</span></li>"+
          "<li><span>S<sub>o2</sub><sup>r</sup> = "+outputVar['SsupR2']+"%</span></li>"+
          "<li><span>C<sub>2</sub><sup>r</sup> = "+outputVar['CsupR2']+"%</span></li>"+
          "<li><span>H<sub>2</sub><sup>r</sup> = "+outputVar['HsupR2']+"%</span></li>"+
          "<li><span>N<sub>2</sub><sup>r</sup> = "+outputVar['NsupR2']+"%</span></li>"+
          "<li><span>O<sub>2</sub><sup>r</sup> = "+outputVar['OsupR2']+"%</span></li>"+"</ul></div>";

      }

      this.viewResult = function(){
        $('.viewComposition').html(html);
        $('.QsubLowerInput').show();
      }
    }
    // Class recalculation fuel


    if(!inputVar['WsupR1'] || !inputVar['AsupR1'] || ((!inputVar['SsubR1'] || !inputVar['SsubO1']) && !inputVar['SsupR1']) || !inputVar['CsupR1'] || !inputVar['HsupR1'] || !inputVar['NsupR1'] || !inputVar['OsupR1']){
      Error();
      return false;
    }
    else{
      $('.error').hide();
    }

    if(inputVar['SsubR1'] || inputVar['SsubO1']){

      if(inputVar['WsupR2']){
      var fuel1 = new fuelRecalculation(pH1 = 'WsupR2', pH2 = 'AsupR2', pH3 = 'AsupR1', pH4 = 'WsupR1');
      fuel1.viewResult();
     }
     else{
      var fuel1 = new fuelRecalculation(pH1 = 'AsupR2', pH2 = 'WsupR2', pH3 = 'WsupR1', pH4 = 'AsupR1');
      fuel1.viewResult();
     }
    }

    else{
      if(inputVar['WsupR2']){
        var fuel1 = new fuelRecalculation(pH1 = 'WsupR2', pH2 = 'AsupR2', pH3 = 'AsupR1', pH4 = 'WsupR1');
        fuel1.viewResult();
    }
      else{
        var fuel1 = new fuelRecalculation(pH1 = 'AsupR2', pH2 = 'WsupR2', pH3 = 'WsupR1', pH4 = 'AsupR1');
        fuel1.viewResult();

      }
    }

    $('.QsubLowerInput').show();
  });

  //class recalculationLower

  function recalculationLower(){

    if(inputVar['WsupR2']){
      outputVar['QsubLower2'] = parseFloat((((inputVar['QsubLower1'] + (24.42*inputVar['WsupR1']))*((100-inputVar['WsupR2']-outputVar['AsupR2'])/(100-inputVar['WsupR1']-inputVar['AsupR1']))) - (24,42*inputVar['WsupR2'])).toFixed(4));
    }
    else{
      outputVar['QsubLower2'] = parseFloat((((inputVar['QsubLower1'] + (24.42*inputVar['WsupR1']))*((100-outputVar['WsupR2']-inputVar['AsupR2'])/(100-inputVar['WsupR1']-inputVar['AsupR1']))) - (24,42*outputVar['WsupR2'])).toFixed(4));
    }

    // Convert to kkal
    inputVar['QsubLower1kkal'] = parseFloat((inputVar['QsubLower1'] / 4.1868).toFixed(4));
    outputVar['QsubLower2kkal'] = parseFloat((outputVar['QsubLower2'] / 4.1868).toFixed(4));



    // Convert to kkal

    var html = "<div class='animated zoomIn'>"+
    "<p class='part' align='center'>2</p>"+
    "<p>Q<sub>i1</sub><sup>r</sup> = "+ inputVar['QsubLower1'] +" кДж/кг = "+ inputVar['QsubLower1kkal'] +" Ккал/кг</p>"+
    "<p>Q<sub>i2</sub><sup>r</sup> = "+ outputVar['QsubLower2'] +" кДж/кг = "+ outputVar['QsubLower2kkal'] +" Ккал/кг</p></div>";

    this.viewResult = function(){
      $('.viewQsubLower').html(html);
      $('#QsubLower2kkal').text(outputVar['QsubLower2kkal']);
    }

  }

  //class recalculationLower

  $('.okQsubLowerInput').on('click', function(){
    inputVar['QsubLower1'] = parseFloat($('#QsubLower').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

    if(!inputVar['QsubLower1']){
      Error();
      return false;
    }
    else{
      $('.error').hide();
    }

    var lower = new recalculationLower();
    lower.viewResult();

    calculationVolumes();
  });

  //class calculationVolumes

  function calculationVolumes(){

    // If SsupR1 true
    if(inputVar['SsupR1']){
      Volume['0'] = parseFloat((0.0889*(outputVar['CsupR2'] + 0.375*outputVar['SsupR2']) + 0.265*outputVar['HsupR2'] - 0.0333*outputVar['OsupR2']).toFixed(4));
      Volume['RO2'] = parseFloat((0.0187*(outputVar['CsupR2'] + 0.375*outputVar['SsupR2'])).toFixed(4));
    }

    else{
      Volume['0'] = parseFloat((0.0889*(outputVar['CsupR2'] + 0.375*(outputVar['SsubR2'] + outputVar['SsubO2'])) + 0.265*outputVar['HsupR2'] - 0.0333*outputVar['OsupR2']).toFixed(4));
      Volume['RO2'] = parseFloat((0.0187*(outputVar['CsupR2'] + 0.375*(outputVar['SsubR2'] + outputVar['SsubO2']))).toFixed(4));
    }

    Volume['0N2'] = parseFloat((0.79*Volume['0'] + 0.008*outputVar['NsupR2']).toFixed(4));

    if(inputVar['WsupR2']){
      Volume['0H2O'] = parseFloat((0.111*outputVar['HsupR2'] + 0.0124*inputVar['WsupR2'] + 0.0161*Volume['0']).toFixed(4));
    }
    else{
      Volume['0H2O'] = parseFloat((0.111*outputVar['HsupR2'] + 0.0124*outputVar['WsupR2'] + 0.0161*Volume['0']).toFixed(4));
    }

    Volume['0G'] =  parseFloat((Volume['RO2'] + Volume['0N2'] + Volume['0H2O']).toFixed(4));

    var html = "<p class='part' align='center'>3</p>" + '<h3>Вычисление объемов, энтальпии воздуха и продуктов сгорания</h3>'+
    '<ul>'+
    '<li>V<sup>0</sup> = '+ Volume['0'] +' м<sup>3</sup>/кг</li>'+
    '<li>V<sup>0</sup><sub>N2</sub> = '+ Volume['0N2'] +' м<sup>3</sup>/кг</li>'+
    '<li>V<sub>RO2</sub> = '+ Volume['RO2'] +' м<sup>3</sup>/кг</li>'+
    '<li>V<sup>0</sup><sub>H2O</sub> = '+ Volume['0H2O'] +' м<sup>3</sup>/кг</li>'+
    '<li>V<sup>0</sup><sub>г</sub> = '+ Volume['0G'] +' м<sup>3</sup>/кг</li>'+
    '</ul>';
    $('.VolumesAirAndProducts').prepend(html);
    //Create table 1 'Volume values'
     // Calculate for Volume, r, μ, G in the table
    for(i = 0; i<4; i++){
      var VH2Otr, VGtr, rRo2tr, rH2Otr, rp, muZltr, Ggtr;

      VH2Otr = parseFloat((Volume['0H2O'] + 0.0161*(Alpha[i] - 1)*Volume['0']).toFixed(4));
      $('#Vh20Tr').append('<td>'+ VH2Otr +'</td>');

      VGtr = parseFloat((Volume['RO2'] + Volume['0N2'] + VH2Otr + (Alpha[i] - 1)*Volume['0']).toFixed(4));
      massiveVolumeg[i] = VGtr;
      $('#VG20Tr').append('<td>'+ VGtr +'</td>');

      rRo2tr = parseFloat((Volume['RO2'] / VGtr).toFixed(4));
      $('#rRo2tr').append('<td>'+ rRo2tr +'</td>');

      rH2Otr = parseFloat((VH2Otr / VGtr).toFixed(4));
      $('#rH2Otr').append('<td>'+ rH2Otr +'</td>');

      rp = parseFloat((rRo2tr + rH2Otr).toFixed(4));
      massiveRp[i] = rp;
      $('#rp').append('<td>'+ rp +'</td>');

      if(inputVar['WsupR2']){
        Ggtr = parseFloat((1 - 0.01*outputVar['AsupR2'] + 1.306*Alpha[i]*Volume['0']).toFixed(4));
        muZltr = parseFloat((0.01*outputVar['AsupR2']*0.95/Ggtr).toFixed(4));
        $('#muZl').append('<td>'+ muZltr +'</td>');
        $('#Ggtr').append('<td>'+ Ggtr +'</td>');
      }
      else{
        Ggtr = parseFloat((1 - 0.01*inputVar['AsupR2'] + 1.306*Alpha[i]*Volume['0']).toFixed(4));
        muZltr = parseFloat((0.01*inputVar['AsupR2']*0.95/Ggtr).toFixed(4));
        $('#muZl').append('<td>'+ muZltr +'</td>');
        $('#Ggtr').append('<td>'+ Ggtr +'</td>');
      }

    }

    //Show block with Volumes
    $('.VolumesAirAndProducts').addClass('animated jello').hide().show();

    //Show block button for add Enthalpy
    $('.Enthalpy').addClass('animated jello').show();
  }

  //class calculationVolumes

  //class calculationEnthalpy

  function calculationEnthalpy(){

    var EnthalpyCO2Lenght = EnthalpyCO2.length;
    var temperature = 100;

    if(EnthalpyCO2Lenght != 25){
      EnthalpyCO2[EnthalpyCO2Lenght] = parseFloat($('#EnthalpyText').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

      $('#temperatureEnthalpy').text(EnthalpyCO2Lenght*temperature+200);
      $('#EnthalpyText').val('');

      if(EnthalpyCO2.length == 25){
        $('#subEnt').text('N2');
        $('#temperatureEnthalpy').text(100);
      }
    }
    else{
      calculationEnthalpyN2();
    }
  }

  function calculationEnthalpyN2(){

    var EnthalpyN2Lenght = EnthalpyN2.length;
    var temperature = 100;

    if(EnthalpyN2Lenght != 25){
      EnthalpyN2[EnthalpyN2Lenght] = parseFloat($('#EnthalpyText').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

      $('#temperatureEnthalpy').text(EnthalpyN2Lenght*temperature+200);
      $('#EnthalpyText').val('');

      if(EnthalpyN2.length == 25){
        $('#subEnt').text('H2O');
        $('#temperatureEnthalpy').text(100);
      }
    }
    else{
      calculationEnthalpyH2O();
    }
  }

  function calculationEnthalpyH2O(){

    var EnthalpyH2OLenght = EnthalpyH2O.length;
    var temperature = 100;

    if(EnthalpyH2OLenght != 25){
      EnthalpyH2O[EnthalpyH2OLenght] = parseFloat($('#EnthalpyText').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

      $('#temperatureEnthalpy').text(EnthalpyH2OLenght*temperature+200);
      $('#EnthalpyText').val('');

      if(EnthalpyH2O.length == 25){
        $('#subEnt').text('В');
        $('#temperatureEnthalpy').text(100);
      }
    }
    else{
      calculationEnthalpyAir();
    }
  }

  function calculationEnthalpyAir(){

    var EnthalpyAirLenght = EnthalpyAir.length;
    var temperature = 100;

    if(EnthalpyAirLenght != 25){
      EnthalpyAir[EnthalpyAirLenght] = parseFloat($('#EnthalpyText').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

      $('#temperatureEnthalpy').text(EnthalpyAirLenght*temperature+200);
      $('#EnthalpyText').val('');

      if(EnthalpyAir.length == 25){
        $('#subEnt').text('зл');
        $('#temperatureEnthalpy').text(100);
      }
    }
    else{
      calculationEnthalpyAsh();
    }
  }

  function calculationEnthalpyAsh(){

    var EnthalpyAshLenght = EnthalpyAsh.length;
    var temperature = 100;

    if(EnthalpyAshLenght != 25){
      EnthalpyAsh[EnthalpyAshLenght] = parseFloat($('#EnthalpyText').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

      $('#temperatureEnthalpy').text(EnthalpyAshLenght*temperature+200);
      $('#EnthalpyText').val('');

      if(EnthalpyAsh.length == 25){
        $('#successEnthalpy').text('Энтальпии успешно добавлены!').hide().addClass('animated jello').show();
        $('.okEnthalpyInput').hide();
        $('.skipButton').hide();

        calculationEnthalpyH();
      }
    }

  }

  function calculationEnthalpyH(){

    var temperatureofEnt  = 0;
    for (var i = 0; i < 25; i++) {

      EnthalpyH['0G'] = parseFloat((Volume['RO2']*EnthalpyCO2[i] + Volume['0N2']*EnthalpyN2[i] + Volume['0H2O']*EnthalpyH2O[i]).toFixed(2));
      EnthalpyH['0AIR'] = parseFloat((Volume['0']*EnthalpyAir[i]).toFixed(2));

      if(inputVar['WsupR2']){
        EnthalpyH['0ASH'] = parseFloat((0.01*EnthalpyAsh[i]*outputVar['AsupR2']*0.95).toFixed(2));
      }
      else{
        EnthalpyH['0ASH'] = parseFloat((0.01*EnthalpyAsh[i]*inputVar['AsupR2']*0.95).toFixed(2));
      }


      EnthalpyHforAlpha1[i] = parseFloat((EnthalpyH['0G'] + (Alpha[0] - 1)*EnthalpyH['0AIR'] + EnthalpyH['0ASH']).toFixed(2));
      EnthalpyHforAlpha2[i] = parseFloat((EnthalpyH['0G'] + (Alpha[1] - 1)*EnthalpyH['0AIR'] + EnthalpyH['0ASH']).toFixed(2));
      EnthalpyHforAlpha3[i] = parseFloat((EnthalpyH['0G'] + (Alpha[2] - 1)*EnthalpyH['0AIR'] + EnthalpyH['0ASH']).toFixed(2));
      EnthalpyHforAlpha4[i] = parseFloat((EnthalpyH['0G'] + (Alpha[3] - 1)*EnthalpyH['0AIR'] + EnthalpyH['0ASH']).toFixed(2));

      var deltaH1, deltaH2, deltaH3, deltaH4;
      if(i == 0){
        deltaH1 = ' ';
        deltaH2 = ' ';
        deltaH3 = ' ';
        deltaH4 = ' ';
      }
      else{
        deltaH1 = parseFloat((EnthalpyHforAlpha1[i] - EnthalpyHforAlpha1[i-1]).toFixed(2));
        deltaH2 = parseFloat((EnthalpyHforAlpha2[i] - EnthalpyHforAlpha2[i-1]).toFixed(2));
        deltaH3 = parseFloat((EnthalpyHforAlpha3[i] - EnthalpyHforAlpha3[i-1]).toFixed(2));
        deltaH4 = parseFloat((EnthalpyHforAlpha4[i] - EnthalpyHforAlpha4[i-1]).toFixed(2));
      }
      temperatureofEnt = temperatureofEnt + 100;

      var html = '<tr>'+
      '<td>'+ temperatureofEnt +'</td>'+
      '<td>'+ EnthalpyH['0G'] +'</td>'+
      '<td>'+ EnthalpyH['0AIR'] +'</td>'+
      '<td>'+ EnthalpyH['0ASH'] +'</td>'+
      '<td>'+ EnthalpyHforAlpha1[i] +'</td>'+
      '<td>'+ deltaH1 +'</td>'+
      '<td>'+ EnthalpyHforAlpha2[i] +'</td>'+
      '<td>'+ deltaH2 +'</td>'+
      '<td>'+ EnthalpyHforAlpha3[i] +'</td>'+
      '<td>'+ deltaH3 +'</td>'+
      '<td>'+ EnthalpyHforAlpha4[i] +'</td>'+
      '<td>'+ deltaH4 +'</td>'+
      '</tr>';

      $('#Table2').append(html);

      //Show block with Enthalpy and Table CHAMBER
      $('.EnthalpyTable').addClass('animated jello').hide().show();
      $('#Chamber').addClass('animated jello').hide().show();
      $('.calculationChamber').addClass('animated jello').hide().show();
    }

  }


  // Click on the button okEnthalpyInput
  $('.okEnthalpyInput').on('click', function(){

    calculationEnthalpy();

  });
  // Click on the button okEnthalpyInput

  //class calculationEnthalpy

//----------------------------------------CHAMBER-----------------------------------------------------------------

  // Click on the button okCalculationChamber
  $('.okCalculationChamber').on('click', function(){

    recalculationChamberInputVariable();

  });
  // Skip button
  $('.skipButton').on('click', function(){

    $('#Chamber').addClass('animated jello').hide().show();
    $('.calculationChamber').addClass('animated jello').hide().show();

  });
  // Skip button
  // Click on the button okCalculationChamber

  //class calculationChamber

  function recalculationChamberInputVariable(){

    inputVarCham['ipp'] = parseFloat($('#CHField1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['ipv'] = parseFloat($('#CHField2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Dnp'] = parseFloat($('#CHField3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['ikin'] = parseFloat($('#CHField4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['ttl'] = parseFloat($('#CHField5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Ccl'] = parseFloat($('#CHField6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['q3'] = parseFloat($('#CHField7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['q4'] = parseFloat($('#CHField8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['q5'] = parseFloat($('#CHField9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Ctetazl'] = parseFloat($('#CHField10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Ihv'] = parseFloat($('#CHField11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Iuhg'] = parseFloat($('#CHField12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['AlphaUh'] = parseFloat($('#CHField13').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

    outputVarCham['Dpr'] = parseFloat((0.03*inputVarCham['Dnp']).toFixed(2));
    outputVarCham['Qsuccess'] = parseFloat((inputVarCham['Dnp']*(inputVarCham['ipp'] - inputVarCham['ipv']) + outputVarCham['Dpr']*(inputVarCham['ikin'] - inputVarCham['ipv'])).toFixed(2));

    if(inputVar['WsupR2']){
      outputVarCham['Crl'] = parseFloat((inputVar['WsupR2']/100 +inputVarCham['Ccl']*(100 - inputVar['WsupR2'])/100).toFixed(2));
    }
    else{
      outputVarCham['Crl'] = parseFloat((outputVar['WsupR2']/100 +inputVarCham['Ccl']*(100 - outputVar['WsupR2'])/100).toFixed(2));
    }

    outputVarCham['itl'] = parseFloat((inputVarCham['ttl']*outputVarCham['Crl']).toFixed(2));
    outputVarCham['Qrr'] = parseFloat((outputVar['QsubLower2kkal'] + outputVarCham['itl']).toFixed(2));
    outputVarCham['Ashlak'] = parseFloat((1 - 0.95).toFixed(2));

    if(inputVar['WsupR2']){
      outputVarCham['q6'] = parseFloat((outputVarCham['Ashlak']*inputVarCham['Ctetazl']*outputVar['AsupR2']/outputVarCham['Qrr']).toFixed(2));
    }
    else{
      outputVarCham['q6'] = parseFloat((outputVarCham['Ashlak']*inputVarCham['Ctetazl']*inputVar['AsupR2']/outputVarCham['Qrr']).toFixed(2));
    }

    outputVarCham['q2'] = parseFloat(((inputVarCham['Iuhg'] - inputVarCham['AlphaUh']*inputVarCham['Ihv'])*(100 - inputVarCham['q4'])/outputVarCham['Qrr']).toFixed(2));
    outputVarCham['qSumma'] = parseFloat((outputVarCham['q2'] + inputVarCham['q3'] + inputVarCham['q4'] + inputVarCham['q5'] + outputVarCham['q6']).toFixed(2));
    outputVarCham['KPDkl'] = parseFloat((100 - outputVarCham['qSumma']).toFixed(2));
    outputVarCham['B'] = parseFloat(((outputVarCham['Qsuccess']*3600*100)/(outputVarCham['Qrr']*outputVarCham['KPDkl'])).toFixed(2));
    outputVarCham['Br'] = parseFloat((outputVarCham['B']*(1 - inputVarCham['q4']/100)).toFixed(2));
    outputVarCham['fi'] = parseFloat((1 - (inputVarCham['q5']/(outputVarCham['KPDkl'] + inputVarCham['q5']))).toFixed(2));

    $('#CHPaste1').text(outputVarCham['Dpr']);
    $('#CHPaste2').text(outputVarCham['Qsuccess']);
    $('#CHPaste3').text(outputVarCham['Crl']);
    $('#CHPaste4').text(outputVarCham['itl']);
    $('#CHPaste5').text(outputVarCham['Ashlak']);
    $('#CHPaste6').text(outputVarCham['q6']);
    $('#CHPaste7').text(outputVarCham['q2']);
    $('#CHPaste8').text(outputVarCham['qSumma']);
    $('#CHPaste9').text(outputVarCham['KPDkl']);
    $('#CHPaste10').text(outputVarCham['B']);
    $('#CHPaste11').text(outputVarCham['Br']);
    $('#CHPaste12').text(outputVarCham['fi']);
    $('#CHPaste13').text(outputVarCham['Qrr']);

    //Continue Table of CHAMBER

    inputVarCham['D'] = parseFloat($('#CHField14').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['deltaAlphaT'] = parseFloat($('#CHField15').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['deltaAlphaPL'] = parseFloat($('#CHField16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['tgv'] = parseFloat($('#CHField17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['I0gv'] = parseFloat($('#CHField18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Ta'] = parseFloat($('#CHField19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['KhiT'] = parseFloat($('#CHField20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Teta1'] = parseFloat($('#CHField21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['It1'] = parseFloat($('#CHField22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Fst'] = parseFloat($('#CHField23').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Fb'] = parseFloat($('#CHField24').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Fikr'] = parseFloat($('#CHField33').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Kg'] = parseFloat($('#CHField25').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Kzl'] = parseFloat($('#CHField26').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Kkoks'] = parseFloat($('#CHField27').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Khi1'] = parseFloat($('#CHField28').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Khi2'] = parseFloat($('#CHField29').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['Beta'] = parseFloat($('#CHField30').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['KsiSr'] = parseFloat($('#CHField31').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarCham['It2'] = parseFloat($('#CHField32').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));

    outputVarCham['as'] = parseFloat((0.67*Math.sqrt(inputVarCham['D'])).toFixed(2));
    outputVarCham['bt'] = parseFloat((2*outputVarCham['as']/3).toFixed(2));
    outputVarCham['Qv'] = parseFloat(((Alpha[0] - inputVarCham['deltaAlphaPL'])*inputVarCham['I0gv'] + inputVarCham['deltaAlphaPL']*inputVarCham['Ihv']).toFixed(2));
    outputVarCham['Qt'] = parseFloat(((100 - inputVarCham['q3'] - inputVarCham['q4'] - outputVarCham['q6'])*outputVarCham['Qrr']/(100 - inputVarCham['q4']) + outputVarCham['Qv']).toFixed(2));
    outputVarCham['M'] = parseFloat((0.59 - 0.5*inputVarCham['KhiT']).toFixed(2));
    outputVarCham['Ql'] = parseFloat((outputVarCham['fi']*(outputVarCham['Qt'] - inputVarCham['It1'])).toFixed(2));
    outputVarCham['VcSr'] = parseFloat(((outputVarCham['Qt'] - inputVarCham['It1'])/(inputVarCham['Ta'] - inputVarCham['Teta1'])).toFixed(2));
    outputVarCham['V'] = parseFloat((inputVarCham['Fb']*outputVarCham['as']).toFixed(2));
    outputVarCham['Stolshina'] = parseFloat((3.6*outputVarCham['V']/inputVarCham['Fst']).toFixed(2));
    outputVarCham['KpS'] = parseFloat(((inputVarCham['Kg']*massiveRp[0] + inputVarCham['Kzl']*0.0057 + inputVarCham['Kkoks']*inputVarCham['Khi1']*inputVarCham['Khi2'])*1.02*outputVarCham['Stolshina']).toFixed(2));
    outputVarCham['aFakel'] = parseFloat((1 - 1/Math.pow(2.71828, outputVarCham['KpS'])).toFixed(2));
    outputVarCham['Hl'] = parseFloat((inputVarCham['Fikr']*inputVarCham['Beta']).toFixed(2));
    outputVarCham['aTopka'] = parseFloat((outputVarCham['aFakel']/(outputVarCham['aFakel'] + (1 - outputVarCham['aFakel'])*inputVarCham['KsiSr'])).toFixed(2));
    var znam = parseFloat((Math.pow(((4.9*inputVarCham['KsiSr']*inputVarCham['Fst']*Math.pow(inputVarCham['Ta'], 3)*outputVarCham['aTopka'])/(Math.pow(10, 8)*outputVarCham['fi']*outputVarCham['Br']*outputVarCham['VcSr'])), 0.6)).toFixed(4));
    outputVarCham['Teta2'] = parseFloat((inputVarCham['Ta']/(outputVarCham['M']*znam + 1) - 273).toFixed(2));
    outputVarCham['VcSr2'] = parseFloat(((outputVarCham['Qt'] - inputVarCham['It2'])/(inputVarCham['Ta'] - outputVarCham['Teta2'])).toFixed(2));
    outputVarCham['B0'] = parseFloat(((outputVarCham['fi']*outputVarCham['Br']*outputVarCham['VcSr2']*Math.pow(10, 8))/(4.9*inputVarCham['KsiSr']*inputVarCham['Fst']*Math.pow(inputVarCham['Ta'], 3))).toFixed(2));
    outputVarCham['Ql2'] = parseFloat((outputVarCham['fi']*(outputVarCham['Qt'] - inputVarCham['It2'])).toFixed(2));
    outputVarCham['ql'] = parseFloat((outputVarCham['Br']*outputVarCham['Ql2']/outputVarCham['Hl']).toFixed(2));
    outputVarCham['qv'] = parseFloat((outputVarCham['B']*outputVar['QsubLower2kkal']/outputVarCham['V']).toFixed(2));

    $('#CHPaste14').text(outputVarCham['as']);
    $('#CHPaste15').text(outputVarCham['bt']);
    $('#CHPaste16').text(outputVarCham['Qv']);
    $('#CHPaste17').text(outputVarCham['Qt']);
    $('#CHPaste18').text(outputVarCham['M']);
    $('#CHPaste19').text(outputVarCham['Ql']);
    $('#CHPaste20').text(outputVarCham['VcSr']);
    $('#CHPaste21').text(outputVarCham['V']);
    $('#CHPaste22').text(outputVarCham['Stolshina']);
    $('#CHPaste23').text(outputVarCham['KpS']);
    $('#CHPaste24').text(outputVarCham['aFakel']);
    $('#CHPaste25').text(outputVarCham['Hl']);
    $('#CHPaste26').text(outputVarCham['aTopka']);
    $('#CHPaste27').text(outputVarCham['Teta2']);
    $('#CHPaste28').text(outputVarCham['VcSr2']);
    $('#CHPaste29').text(outputVarCham['B0']);
    $('#CHPaste30').text(outputVarCham['Ql2']);
    $('#CHPaste31').text(outputVarCham['ql']);
    $('#CHPaste32').text(outputVarCham['qv']);

    $('#Screens').addClass('animated jello').hide().show();
    $('.calculationScreens').addClass('animated jello').hide().show();

  }

  //class calculationChamber

//----------------------------------------SCREENS-----------------------------------------------------------------

  // Click on the button okCalculationScreens
  $('.okCalculationScreens').on('click', function(){

    recalculationScreensInputVariable();

  });
  // Click on the button okCalculationScreens


  //class calculationScreens

  function recalculationScreensInputVariable(){

    inputVarScreen['i1Strih1'] = parseFloat($('#SCField1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['i1Strih2'] = parseFloat($('#SCField2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['t1Strih1'] = parseFloat($('#SCField3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['t1Strih2'] = parseFloat($('#SCField4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['psr'] = parseFloat($('#SCField5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Dshirm'] = parseFloat($('#SCField6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Qdop'] = parseFloat($('#SCField7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['hshirm'] = parseFloat($('#SCField8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['nshirm'] = parseFloat($('#SCField9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['roWp1'] = parseFloat($('#SCField10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['ntrub'] = parseFloat($('#SCField11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['S2'] = parseFloat($('#SCField12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['dn'] = parseFloat($('#SCField13').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['etaV'] = parseFloat($('#SCField14').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['beta'] = parseFloat($('#SCField15').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['hVhshirm'] = parseFloat($('#SCField16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['TetaSr1'] = parseFloat($('#SCField17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['kg'] = parseFloat($('#SCField18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['kzl'] = parseFloat($('#SCField19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['hVihshirm'] = parseFloat($('#SCField20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['ksip'] = parseFloat($('#SCField21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Teta1Strih2'] = parseFloat($('#SCField22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['khi'] = parseFloat($('#SCField23').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['psi'] = parseFloat($('#SCField24').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Cz'] = parseFloat($('#SCField25').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Cf'] = parseFloat($('#SCField26').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['AlphaNk1'] = parseFloat($('#SCField27').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Epsilon'] = parseFloat($('#SCField28').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Vp'] = parseFloat($('#SCField29').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Alpha2'] = parseFloat($('#SCField30').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['AlphaNl1'] = parseFloat($('#SCField31').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['ro'] = parseFloat($('#SCField32').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['Teta2Strih2'] = parseFloat($('#SCField33').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarScreen['t2Strih1'] = parseFloat($('#SCField34').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));


    outputVarScreen['Teta1Strih1'] = parseFloat((outputVarCham['Teta2']).toFixed(2));
    outputVarScreen['I1Strih1'] = parseFloat((inputVarCham['It2']).toFixed(2));
    outputVarScreen['deltaishirm'] = parseFloat((inputVarScreen['i1Strih2'] - inputVarScreen['i1Strih1']).toFixed(2));
    outputVarScreen['tsr'] = parseFloat(((inputVarScreen['t1Strih1'] + inputVarScreen['t1Strih2'])/2).toFixed(2));
    outputVarScreen['S1'] = parseFloat((outputVarCham['as']/(inputVarScreen['nshirm'] + 1)).toFixed(2));
    outputVarScreen['f1'] = parseFloat((inputVarCham['D']*1000/(3600*inputVarScreen['roWp1'])).toFixed(4));
    outputVarScreen['dvn'] = parseFloat((inputVarScreen['dn'] - 2*0.004).toFixed(3));
    outputVarScreen['ntrubShirma'] = parseFloat((4*outputVarScreen['f1']/(3.14*Math.pow(outputVarScreen['dvn'], 2)*inputVarScreen['nshirm'])).toFixed(2));
    outputVarScreen['lshirm'] = parseFloat((2*(inputVarScreen['ntrub'] - 1)*inputVarScreen['S2'] + 4*inputVarScreen['dn']).toFixed(2));
    outputVarScreen['roW1'] = parseFloat((4*inputVarCham['D']*1000/(3600*3.14*Math.pow(outputVarScreen['dvn'], 2)*(inputVarScreen['nshirm']/2)*inputVarScreen['ntrub'])).toFixed(2));
    outputVarScreen['Hlvh'] = parseFloat((outputVarCham['as']*inputVarScreen['hVhshirm']).toFixed(2));
    outputVarScreen['Qlvh'] = parseFloat((outputVarCham['Ql2']*inputVarScreen['etaV']*inputVarScreen['beta']*outputVarScreen['Hlvh']/inputVarCham['Fst']).toFixed(2));
    outputVarScreen['k'] = parseFloat((inputVarScreen['kg']*massiveRp[0] + inputVarScreen['kzl']*0.0057).toFixed(3));
    outputVarScreen['Stolshina'] = parseFloat((1.8/((1/outputVarScreen['S1']) + (1/outputVarScreen['lshirm']) + (1/inputVarScreen['hshirm']))).toFixed(2));
    outputVarScreen['KpS'] = parseFloat((outputVarScreen['k']*1*outputVarScreen['Stolshina']).toFixed(3));
    outputVarScreen['aShirma'] = parseFloat((1 - 1/Math.pow(2.71828, outputVarScreen['KpS'])).toFixed(3));
    outputVarScreen['fiShirm'] = parseFloat((Math.sqrt(Math.pow(outputVarScreen['lshirm']/outputVarScreen['S1'],2) + 1) -  outputVarScreen['lshirm']/outputVarScreen['S1']).toFixed(3));
    outputVarScreen['Hlvih'] = parseFloat((outputVarCham['as']*inputVarScreen['hVihshirm']).toFixed(2));
    var helpVar = Math.pow(outputVarScreen['Teta1Strih1']+273, 4)/Math.pow(10, 8);
    outputVarScreen['Qlvih'] = parseFloat(((outputVarScreen['Qlvh']*(outputVarScreen['aShirma'] + 1)*outputVarScreen['fiShirm']/inputVarScreen['beta']) + (4.9*outputVarScreen['aShirma']*outputVarScreen['Hlvih']*inputVarScreen['ksip']*helpVar)/outputVarCham['Br']).toFixed(2));
    outputVarScreen['Qlshirm'] = parseFloat((outputVarScreen['Qlvh'] - outputVarScreen['Qlvih']).toFixed(2));
    outputVarScreen['I2Strih2'] = parseFloat((outputVarScreen['I1Strih1'] - (outputVarScreen['Qlshirm'] - inputVarScreen['Qdop'] - inputVarScreen['Dshirm']*outputVarScreen['deltaishirm']/outputVarCham['Br'])/outputVarCham['fi']).toFixed(2));
    outputVarScreen['TetaSr2'] = parseFloat(((inputVarScreen['Teta1Strih2'] + outputVarScreen['Teta1Strih1'])/2).toFixed(2));
    outputVarScreen['Hr'] = parseFloat((2*inputVarScreen['hshirm']*(outputVarScreen['lshirm'] + inputVarScreen['dn'])*inputVarScreen['nshirm']*inputVarScreen['khi']).toFixed(2));
    outputVarScreen['Taub1'] = parseFloat((outputVarScreen['Teta1Strih1'] - inputVarScreen['Teta1Strih2']).toFixed(2));
    outputVarScreen['Taum1'] = parseFloat((inputVarScreen['t1Strih2'] - inputVarScreen['t1Strih1']).toFixed(2));
    outputVarScreen['deltatb1'] = parseFloat((outputVarScreen['Teta1Strih1'] - inputVarScreen['t1Strih1']).toFixed(2));
    outputVarScreen['deltatm1'] = parseFloat((inputVarScreen['Teta1Strih2'] - inputVarScreen['t1Strih2']).toFixed(2));
    outputVarScreen['ParamP'] = parseFloat((outputVarScreen['Taum1']/(inputVarScreen['Teta1Strih2'] - inputVarScreen['t1Strih1'])).toFixed(2));
    outputVarScreen['ParamR'] = parseFloat((outputVarScreen['Taub1']/outputVarScreen['Taum1']).toFixed(2));
    outputVarScreen['deltatSr'] = parseFloat(((outputVarScreen['deltatb1'] + outputVarScreen['deltatm1'])/2).toFixed(2));
    outputVarScreen['deltat'] = parseFloat((outputVarScreen['deltatSr']*inputVarScreen['psi']).toFixed(2));
    outputVarScreen['F'] = parseFloat((outputVarCham['as']*inputVarScreen['hshirm'] - inputVarScreen['hshirm']*inputVarScreen['dn']*inputVarScreen['nshirm']).toFixed(2));
    outputVarScreen['Wg'] = parseFloat((outputVarCham['Br']*massiveVolumeg[0]*(outputVarScreen['TetaSr2'] + 273)/(3600*outputVarScreen['F']*273)).toFixed(2));
    outputVarScreen['Qshirm'] = parseFloat((inputVarScreen['Dshirm']*1000*outputVarScreen['deltaishirm']/outputVarCham['Br'] - outputVarScreen['Qlshirm']).toFixed(2));
    outputVarScreen['sigma1'] = parseFloat((outputVarScreen['S1']/inputVarScreen['dn']).toFixed(2));
    outputVarScreen['sigma2'] = parseFloat((inputVarScreen['S2']/inputVarScreen['dn']).toFixed(2));
    var helpVar = parseFloat(((Math.pow((1 - (outputVarScreen['sigma2']/2)), 3)*(2*3 - 3)) + 1).toFixed(2));
    outputVarScreen['Cs'] = parseFloat((Math.pow(helpVar,-2)).toFixed(3));
    outputVarScreen['Alphak'] = parseFloat((inputVarScreen['AlphaNk1']*outputVarScreen['Cs']*inputVarScreen['Cz']*inputVarScreen['Cf']).toFixed(2));
    outputVarScreen['Wp'] = parseFloat((outputVarScreen['roW1']*inputVarScreen['Vp']).toFixed(2));
    outputVarScreen['tz'] = parseFloat((outputVarScreen['tsr'] + ((inputVarScreen['Epsilon'] + 1/inputVarScreen['Alpha2'])*(outputVarScreen['Qshirm'] + outputVarScreen['Qlshirm'])*outputVarCham['Br']/outputVarScreen['Hr'])).toFixed(2));
    outputVarScreen['Alphal'] = parseFloat((outputVarScreen['aShirma']*inputVarScreen['AlphaNl1']).toFixed(2));
    outputVarScreen['Alpha1'] = parseFloat((inputVarScreen['ro']*(inputVarScreen['AlphaNk1']*3.14*inputVarScreen['dn']/(2*inputVarScreen['S2']*inputVarScreen['khi']) + outputVarScreen['Alphal'])).toFixed(2));
    outputVarScreen['k2'] = parseFloat((outputVarScreen['Alpha1']/(1 + (1 + outputVarScreen['Qlshirm']/outputVarScreen['Qshirm'])*(inputVarScreen['Epsilon'] + 1/inputVarScreen['Alpha2'])*outputVarScreen['Alpha1'])).toFixed(2));
    outputVarScreen['Qt'] = parseFloat((outputVarScreen['k2']*outputVarScreen['deltat']*outputVarScreen['Hr']/outputVarCham['Br']).toFixed(2));
    outputVarScreen['Qtau'] = parseFloat((outputVarScreen['Qt']).toFixed(2));
    outputVarScreen['I3Strih2'] = parseFloat((outputVarScreen['I1Strih1'] - (outputVarScreen['Qshirm'] - inputVarScreen['Qdop'])/outputVarCham['fi']).toFixed(2));
    outputVarScreen['i2Strih1'] = parseFloat((inputVarScreen['i1Strih2'] - (outputVarScreen['Qshirm'] + outputVarScreen['Qlshirm'])*outputVarCham['Br']/(inputVarScreen['Dshirm']*1000)).toFixed(2));
    outputVarScreen['deltat2b1'] = parseFloat((outputVarScreen['Teta1Strih1'] - inputVarScreen['t2Strih1']).toFixed(2));
    outputVarScreen['deltat2m1'] = parseFloat((inputVarScreen['Teta2Strih2'] - inputVarScreen['t1Strih2']).toFixed(2));
    outputVarScreen['deltat2'] = parseFloat(((outputVarScreen['deltat2b1'] + outputVarScreen['deltat2m1'])*inputVarScreen['psi']/2).toFixed(2));
    outputVarScreen['Qt2'] = parseFloat((outputVarScreen['k2']*outputVarScreen['deltat2']*outputVarScreen['Hr']/outputVarCham['Br']).toFixed(2));
    outputVarScreen['pogreshnost'] = parseFloat((Math.abs((outputVarScreen['Qt2'] - outputVarScreen['Qt'])/outputVarScreen['Qt2'])*100).toFixed(2));

    $('#SCPaste1').text(outputVarScreen['Teta1Strih1']);
    $('#SCPaste2').text(outputVarScreen['I1Strih1']);
    $('#SCPaste3').text(outputVarScreen['deltaishirm']);
    $('#SCPaste4').text(outputVarScreen['tsr']);
    $('#SCPaste5').text(outputVarScreen['S1']);
    $('#SCPaste6').text(outputVarScreen['f1']);
    $('#SCPaste7').text(outputVarScreen['ntrubShirma']);
    $('#SCPaste8').text(outputVarScreen['dvn']);
    $('#SCPaste9').text(outputVarScreen['lshirm']);
    $('#SCPaste10').text(outputVarScreen['roW1']);
    $('#SCPaste11').text(outputVarScreen['Qlshirm']);
    $('#SCPaste12').text(outputVarScreen['Hlvh']);
    $('#SCPaste13').text(outputVarScreen['Qlvh']);
    $('#SCPaste14').text(outputVarScreen['k']);
    $('#SCPaste15').text(outputVarScreen['Stolshina']);
    $('#SCPaste16').text(outputVarScreen['KpS']);
    $('#SCPaste17').text(outputVarScreen['aShirma']);
    $('#SCPaste18').text(outputVarScreen['fiShirm']);
    $('#SCPaste19').text(outputVarScreen['Hlvih']);
    $('#SCPaste20').text(outputVarScreen['Qlvih']);
    $('#SCPaste21').text(outputVarScreen['I2Strih2']);
    $('#SCPaste22').text(outputVarScreen['TetaSr2']);
    $('#SCPaste23').text(outputVarScreen['Hr']);
    $('#SCPaste24').text(outputVarScreen['Taub1']);
    $('#SCPaste25').text(outputVarScreen['Taum1']);
    $('#SCPaste26').text(outputVarScreen['deltatb1']);
    $('#SCPaste27').text(outputVarScreen['deltatm1']);
    $('#SCPaste28').text(outputVarScreen['ParamP']);
    $('#SCPaste29').text(outputVarScreen['ParamR']);
    $('#SCPaste30').text(outputVarScreen['deltatSr']);
    $('#SCPaste31').text(outputVarScreen['deltat']);
    $('#SCPaste32').text(outputVarScreen['F']);
    $('#SCPaste33').text(outputVarScreen['Wg']);
    $('#SCPaste34').text(outputVarScreen['Qshirm']);
    $('#SCPaste35').text(outputVarScreen['sigma1'] + ' (Принимаем 3)');
    $('#SCPaste36').text(outputVarScreen['sigma2']);
    $('#SCPaste37').text(outputVarScreen['Cs']);
    $('#SCPaste38').text(outputVarScreen['Alphak']);
    $('#SCPaste39').text(outputVarScreen['Wp']);
    $('#SCPaste40').text(outputVarScreen['tz']);
    $('#SCPaste41').text(outputVarScreen['Alphal']);
    $('#SCPaste52').text(outputVarScreen['Alpha1']);
    $('#SCPaste42').text(outputVarScreen['k2']);
    $('#SCPaste43').text(outputVarScreen['Qt']);
    $('#SCPaste44').text(outputVarScreen['Qtau']);
    $('#SCPaste45').text(outputVarScreen['I3Strih2']);
    $('#SCPaste46').text(outputVarScreen['i2Strih1']);
    $('#SCPaste47').text(outputVarScreen['deltat2b1']);
    $('#SCPaste48').text(outputVarScreen['deltat2m1']);
    $('#SCPaste49').text(outputVarScreen['deltat2']);
    $('#SCPaste50').text(outputVarScreen['Qt2']);
    $('#SCPaste51').text(outputVarScreen['pogreshnost']);

    $('#HotStep').addClass('animated jello').hide().show();
    $('.calculationHotStep').addClass('animated jello').hide().show();

  }

  //class calculationScreens

//----------------------------------------HOTSTEP-----------------------------------------------------------------

  // Click on the button okCalculationHotStep
  $('.okcalculationHotStep').on('click', function(){

    recalculationHotStepInputVariable();

  });
  // Click on the button okCalculationHotStep

  //class calculationHOTSTEP

  function recalculationHotStepInputVariable(){

    inputVarHotS['i1Strih1'] = parseFloat($('#HSField1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['i1Strih2'] = parseFloat($('#HSField2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['t1Strih1'] = parseFloat($('#HSField3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['t1Strih2'] = parseFloat($('#HSField4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Dgs'] = parseFloat($('#HSField5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['pvh'] = parseFloat($('#HSField6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['pvih'] = parseFloat($('#HSField7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Teta1Strih1'] = parseFloat($('#HSField8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Teta1Strih2'] = parseFloat($('#HSField9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['dn'] = parseFloat($('#HSField10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['dvn'] = parseFloat($('#HSField11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['S1'] = parseFloat($('#HSField12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['S2'] = parseFloat($('#HSField13').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['roWp1'] = parseFloat($('#HSField14').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Vp'] = parseFloat($('#HSField15').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['hgor'] = parseFloat($('#HSField16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['k'] = parseFloat($('#HSField17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['kg'] = parseFloat($('#HSField18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['kzl'] = parseFloat($('#HSField19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['psi'] = parseFloat($('#HSField20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Epsilon'] = parseFloat($('#HSField21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['AlphaN2'] = parseFloat($('#HSField22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Cd'] = parseFloat($('#HSField23').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['AlphaNl'] = parseFloat($('#HSField24').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Cz'] = parseFloat($('#HSField25').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['Cf'] = parseFloat($('#HSField26').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['AlphaNk'] = parseFloat($('#HSField27').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarHotS['ksi'] = parseFloat($('#HSField28').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));


    outputVarHotS['deltai'] = parseFloat((inputVarHotS['i1Strih2'] - inputVarHotS['i1Strih1']).toFixed(2));
    outputVarHotS['isr'] = parseFloat(((inputVarHotS['i1Strih1'] + inputVarHotS['i1Strih2'])/2).toFixed(2));
    outputVarHotS['tsr'] = parseFloat(((inputVarHotS['t1Strih1'] + inputVarHotS['t1Strih2'])/2).toFixed(2));
    outputVarHotS['I1strih1'] = parseFloat((outputVarScreen['I3Strih2']).toFixed(2));
    outputVarHotS['Qb'] = parseFloat(((inputVarHotS['Dgs']*1000*outputVarHotS['deltai']/outputVarCham['Br']) - outputVarScreen['Qlshirm']).toFixed(2));
    outputVarHotS['I1strih2'] = parseFloat(((outputVarCham['fi']*outputVarHotS['I1strih1'] - outputVarHotS['Qb'])/outputVarCham['fi']).toFixed(2));
    outputVarHotS['psr'] = parseFloat(((inputVarHotS['pvh'] + inputVarHotS['pvih'])/2).toFixed(2));
    outputVarHotS['TetaSr'] = parseFloat(((inputVarHotS['Teta1Strih1'] + inputVarHotS['Teta1Strih2'])/2).toFixed(2));
    outputVarHotS['sigma1'] = parseFloat((inputVarHotS['S1']/inputVarHotS['dn']).toFixed(2));
    outputVarHotS['sigma2'] = parseFloat((inputVarHotS['S2']/inputVarHotS['dn']).toFixed(2));
    outputVarHotS['nzm'] = parseFloat((outputVarCham['as']/inputVarHotS['S1'] - 1).toFixed(0));
    outputVarHotS['f1'] = parseFloat((inputVarHotS['Dgs']*1000/(3600*inputVarHotS['roWp1'])).toFixed(4));
    outputVarHotS['nzah'] = parseFloat((4*outputVarHotS['f1']/(3.14*Math.pow(inputVarHotS['dvn'], 2)*outputVarHotS['nzm'])).toFixed(0));
    outputVarHotS['f2nov'] = parseFloat(((3.14*Math.pow(inputVarHotS['dvn'], 2)/4)*outputVarHotS['nzm']*outputVarHotS['nzah']).toFixed(4));
    outputVarHotS['nzm2'] = parseFloat(((4*outputVarHotS['f2nov'])/(3.14*Math.pow(inputVarHotS['dvn'], 2)*outputVarHotS['nzah'])).toFixed(0));
    outputVarHotS['roW1nov'] = parseFloat((inputVarHotS['Dgs']*1000/(outputVarHotS['f2nov']*3600)).toFixed(2));
    outputVarHotS['Wp'] = parseFloat((outputVarHotS['roW1nov']*inputVarHotS['Vp']).toFixed(2));
    outputVarHotS['delta1tb'] = parseFloat((inputVarHotS['Teta1Strih1'] - inputVarHotS['t1Strih1']).toFixed(2));
    outputVarHotS['delta1tm'] = parseFloat((inputVarHotS['Teta1Strih2'] - inputVarHotS['t1Strih2']).toFixed(2));
    outputVarHotS['deltatg'] = parseFloat(((outputVarHotS['delta1tb'] - outputVarHotS['delta1tm'])/(2.3*Math.log10(outputVarHotS['delta1tb']/outputVarHotS['delta1tm']))).toFixed(2));
    outputVarHotS['F'] = parseFloat((inputVarHotS['hgor']*outputVarCham['as'] - outputVarCham['bt']*inputVarHotS['dn']*outputVarHotS['nzm2']).toFixed(2));
    outputVarHotS['Wg'] = parseFloat((outputVarCham['Br']*massiveVolumeg[0]*(outputVarHotS['TetaSr'] + 273)/(3600*outputVarHotS['F']*273)).toFixed(2));
    outputVarHotS['Hg'] = parseFloat((outputVarCham['Br']*outputVarHotS['Qb']/(inputVarHotS['k']*outputVarHotS['deltatg'])).toFixed(2));
    outputVarHotS['Stolshina'] = parseFloat((0.9*inputVarHotS['dn']*((4*inputVarHotS['S1']*inputVarHotS['S2']/(3.14*Math.pow(inputVarHotS['dn'], 2))) - 1)).toFixed(3));
    outputVarHotS['kluch'] = parseFloat((inputVarHotS['kg']*massiveRp[0] + inputVarHotS['kzl']*0.0057).toFixed(3));
    outputVarHotS['KpS'] = parseFloat((outputVarHotS['kluch']*1*outputVarHotS['Stolshina']).toFixed(3));
    outputVarHotS['aStupen'] = parseFloat((1 - 1/Math.pow(2.71828, outputVarHotS['KpS'])).toFixed(3));
    outputVarHotS['Alpha2'] = parseFloat((inputVarHotS['AlphaN2']*inputVarHotS['Cd']).toFixed(2));
    outputVarHotS['tz'] = parseFloat((outputVarHotS['tsr'] + (inputVarHotS['Epsilon'] + (1/outputVarHotS['Alpha2']))*outputVarCham['Br']*((outputVarHotS['Qb'] + outputVarScreen['Qlvih'])/outputVarHotS['Hg'])).toFixed(2));
    var helpVar = parseFloat(((1 - (Math.pow((outputVarHotS['tz'] + 273)/(outputVarHotS['TetaSr'] + 273), 4)))/(1 - ((outputVarHotS['tz'] + 273)/(outputVarHotS['TetaSr'] + 273)))).toFixed(2));
    outputVarHotS['Alphal'] = parseFloat((4.9*Math.pow(10, -8)*outputVarHotS['aStupen']*Math.pow(outputVarHotS['TetaSr'] + 273, 3)*helpVar).toFixed(2));
    var helpVar = parseFloat(((Math.pow((1 - (outputVarHotS['sigma2']/2)), 3)*(2*outputVarHotS['sigma1'] - 3)) + 1).toFixed(2));
    outputVarHotS['Cs'] = parseFloat((Math.pow(helpVar,-2)).toFixed(3));
    outputVarHotS['Alphak'] = parseFloat((inputVarHotS['AlphaNk']*inputVarHotS['Cz']*outputVarHotS['Cs']*inputVarHotS['Cf']).toFixed(2));
    outputVarHotS['Alpha1'] = parseFloat((inputVarHotS['ksi']*(outputVarHotS['Alphak'] + outputVarHotS['Alphal'])).toFixed(2));
    outputVarHotS['kteplo'] = parseFloat((inputVarHotS['psi']*(outputVarHotS['Alpha1']/(1 + (outputVarHotS['Alpha1']/outputVarHotS['Alpha2'])))).toFixed(2));
    outputVarHotS['HgRash'] = parseFloat((outputVarCham['Br']*outputVarHotS['Qb']/(outputVarHotS['kteplo']*outputVarHotS['deltatg'])).toFixed(2));
    outputVarHotS['pogreshnost'] = parseFloat((Math.abs((outputVarHotS['HgRash'] - outputVarHotS['Hg'])/outputVarHotS['HgRash'])*100).toFixed(2));
    outputVarHotS['lzm'] = parseFloat((outputVarHotS['HgRash']/(3.14*inputVarHotS['dn']*outputVarHotS['nzm2']*outputVarHotS['nzah'])).toFixed(2));
    outputVarHotS['npruchastkov'] = parseFloat((outputVarHotS['HgRash']/(3.14*inputVarHotS['dn']*inputVarHotS['hgor']*outputVarHotS['nzm2']*outputVarHotS['nzah'])).toFixed(0));
    outputVarHotS['Wp'] = parseFloat((outputVarHotS['roW1nov']*inputVarHotS['Vp']).toFixed(2));


    $('#HSPaste1').text(outputVarHotS['deltai']);
    $('#HSPaste2').text(outputVarHotS['isr']);
    $('#HSPaste3').text(outputVarHotS['tsr']);
    $('#HSPaste4').text(outputVarHotS['I1strih1']);
    $('#HSPaste5').text(outputVarHotS['I1strih2']);
    $('#HSPaste6').text(outputVarHotS['Qb']);
    $('#HSPaste7').text(outputVarHotS['psr']);
    $('#HSPaste8').text(outputVarHotS['TetaSr']);
    $('#HSPaste9').text(outputVarHotS['sigma1']);
    $('#HSPaste10').text(outputVarHotS['sigma2']);
    $('#HSPaste11').text(outputVarHotS['nzm']);
    $('#HSPaste12').text(outputVarHotS['f1']);
    $('#HSPaste13').text(outputVarHotS['nzah']);
    $('#HSPaste14').text(outputVarHotS['f2nov']);
    $('#HSPaste15').text(outputVarHotS['nzm2']);
    $('#HSPaste16').text(outputVarHotS['roW1nov']);
    $('#HSPaste17').text(outputVarHotS['delta1tb']);
    $('#HSPaste18').text(outputVarHotS['delta1tm']);
    $('#HSPaste19').text(outputVarHotS['deltatg']);
    $('#HSPaste20').text(outputVarHotS['F']);
    $('#HSPaste21').text(outputVarHotS['Wg']);
    $('#HSPaste22').text(outputVarHotS['Hg']);
    $('#HSPaste23').text(outputVarHotS['Stolshina']);
    $('#HSPaste24').text(outputVarHotS['kluch']);
    $('#HSPaste25').text(outputVarHotS['KpS']);
    $('#HSPaste26').text(outputVarHotS['aStupen']);
    $('#HSPaste27').text(outputVarHotS['Alpha2']);
    $('#HSPaste28').text(outputVarHotS['tz']);
    $('#HSPaste29').text(outputVarHotS['Alphal']);
    $('#HSPaste30').text(outputVarHotS['Cs']);
    $('#HSPaste31').text(outputVarHotS['Alphak']);
    $('#HSPaste32').text(outputVarHotS['Alpha1']);
    $('#HSPaste33').text(outputVarHotS['kteplo']);
    $('#HSPaste34').text(outputVarHotS['HgRash']);
    $('#HSPaste35').text(outputVarHotS['pogreshnost']);
    $('#HSPaste36').text(outputVarHotS['lzm']);
    $('#HSPaste37').text(outputVarHotS['npruchastkov']);
    $('#HSPaste38').text(outputVarHotS['Wp']);

    $('#ColdStep').addClass('animated jello').hide().show();
    $('.calculationColdStep').addClass('animated jello').hide().show();


  }

  //class calculationHOTSTEP

  //----------------------------------------COLDSTEP-----------------------------------------------------------------

    // Click on the button okCalculationHotStep
    $('.okcalculationColdStep').on('click', function(){

      recalculationColdStepInputVariable();

    });
    // Click on the button okCalculationHotStep

  //class calculationCOLDSTEP

  function recalculationColdStepInputVariable(){

    inputVarColdS['i1Strih1'] = parseFloat($('#CSField1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['i1Strih2'] = parseFloat($('#CSField2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['t1Strih1'] = parseFloat($('#CSField3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['t1Strih2'] = parseFloat($('#CSField4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['Dhs'] = parseFloat($('#CSField5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['psr'] = parseFloat($('#CSField6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['Teta1Strih2'] = parseFloat($('#CSField7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['Vp'] = parseFloat($('#CSField8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['dn'] = parseFloat($('#CSField9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['dvn'] = parseFloat($('#CSField10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['S1'] = parseFloat($('#CSField11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['S2'] = parseFloat($('#CSField12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['roWp1'] = parseFloat($('#CSField13').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['k'] = parseFloat($('#CSField14').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['kg'] = parseFloat($('#CSField15').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['kzl'] = parseFloat($('#CSField16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['Epsilon'] = parseFloat($('#CSField17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['psi'] = parseFloat($('#CSField18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['AlphaN2'] = parseFloat($('#CSField19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['Cd'] = parseFloat($('#CSField20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['Cz'] = parseFloat($('#CSField21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['Cf'] = parseFloat($('#CSField22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['AlphaNk'] = parseFloat($('#CSField23').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
    inputVarColdS['ksi'] = parseFloat($('#CSField24').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));


    outputVarColdS['deltai'] = parseFloat((inputVarColdS['i1Strih2'] - inputVarColdS['i1Strih1']).toFixed(2));
    outputVarColdS['tsr'] = parseFloat(((inputVarColdS['t1Strih1'] + inputVarColdS['t1Strih2'])/2).toFixed(2));
    outputVarColdS['I1strih1'] = parseFloat((outputVarHotS['I1strih2']).toFixed(2));
    outputVarColdS['Teta1strih1'] = parseFloat((inputVarHotS['Teta1Strih2']).toFixed(2));
    outputVarColdS['Qb'] = parseFloat(((inputVarColdS['Dhs']*1000*outputVarColdS['deltai']/outputVarCham['Br']) - outputVarScreen['Qlshirm']).toFixed(2));
    outputVarColdS['I1strih2'] = parseFloat(((outputVarCham['fi']*outputVarColdS['I1strih1'] - outputVarColdS['Qb'])/outputVarCham['fi']).toFixed(2));
    outputVarColdS['TetaSr'] = parseFloat(((outputVarColdS['Teta1strih1'] + inputVarColdS['Teta1Strih2'])/2).toFixed(2));
    outputVarColdS['sigma1'] = parseFloat((inputVarColdS['S1']/inputVarColdS['dn']).toFixed(2));
    outputVarColdS['sigma2'] = parseFloat((inputVarColdS['S2']/inputVarColdS['dn']).toFixed(2));
    outputVarColdS['nzm'] = parseFloat((2*outputVarCham['as']/inputVarColdS['S1'] - 2).toFixed(0));
    outputVarColdS['f1'] = parseFloat((inputVarColdS['Dhs']*1000/(3600*inputVarColdS['roWp1'])).toFixed(4));
    outputVarColdS['nzah'] = parseFloat((4*outputVarColdS['f1']/(3.14*Math.pow(inputVarColdS['dvn'], 2)*outputVarColdS['nzm'])).toFixed(0));
    outputVarColdS['f2nov'] = parseFloat(((3.14*Math.pow(inputVarColdS['dvn'], 2)/4)*outputVarColdS['nzm']*outputVarColdS['nzah']).toFixed(4));
    outputVarColdS['roW1nov'] = parseFloat((inputVarColdS['Dhs']*1000/(outputVarColdS['f2nov']*3600)).toFixed(2));
    outputVarColdS['Wp'] = parseFloat((outputVarColdS['roW1nov']*inputVarColdS['Vp']).toFixed(2));
    outputVarColdS['delta1tb'] = parseFloat((outputVarColdS['Teta1strih1'] - inputVarColdS['t1Strih2']).toFixed(2));
    outputVarColdS['delta1tm'] = parseFloat((inputVarColdS['Teta1Strih2'] - inputVarColdS['t1Strih1']).toFixed(2));
    outputVarColdS['deltatlg'] = parseFloat(((outputVarColdS['delta1tb'] - outputVarColdS['delta1tm'])/(2.3*Math.log10(outputVarColdS['delta1tb']/outputVarColdS['delta1tm']))).toFixed(2));
    outputVarColdS['F'] = parseFloat((inputVarHotS['hgor']*outputVarCham['as'] - outputVarCham['bt']*inputVarColdS['dn']*outputVarColdS['nzm']).toFixed(2));
    outputVarColdS['Wg'] = parseFloat((outputVarCham['Br']*massiveVolumeg[0]*(outputVarColdS['TetaSr'] + 273)/(3600*outputVarColdS['F']*273)).toFixed(2));
    outputVarColdS['Hg'] = parseFloat((outputVarCham['Br']*outputVarColdS['Qb']/(inputVarColdS['k']*outputVarColdS['deltatlg'])).toFixed(2));
    outputVarColdS['Stolshina'] = parseFloat((0.9*inputVarColdS['dn']*((4*inputVarColdS['S1']*inputVarColdS['S2']/(3.14*Math.pow(inputVarColdS['dn'], 2))) - 1)).toFixed(3));
    outputVarColdS['kluch'] = parseFloat((inputVarColdS['kg']*massiveRp[0] + inputVarColdS['kzl']*0.0057).toFixed(3));
    outputVarColdS['KpS'] = parseFloat((outputVarColdS['kluch']*1*outputVarColdS['Stolshina']).toFixed(3));
    outputVarColdS['aStupen'] = parseFloat((1 - 1/Math.pow(2.71828, outputVarColdS['KpS'])).toFixed(3));
    outputVarColdS['Alpha2'] = parseFloat((inputVarColdS['AlphaN2']*inputVarColdS['Cd']).toFixed(2));
    outputVarColdS['tz'] = parseFloat((outputVarColdS['tsr'] + (inputVarColdS['Epsilon'] + (1/outputVarColdS['Alpha2']))*outputVarCham['Br']*((outputVarColdS['Qb'])/outputVarColdS['Hg'])).toFixed(2));
    var helpVar = parseFloat(((1 - (Math.pow((outputVarColdS['tz'] + 273)/(outputVarColdS['TetaSr'] + 273), 4)))/(1 - ((outputVarColdS['tz'] + 273)/(outputVarColdS['TetaSr'] + 273)))).toFixed(2));
    outputVarColdS['Alphal'] = parseFloat((4.9*Math.pow(10, -8)*outputVarColdS['aStupen']*Math.pow(outputVarColdS['TetaSr'] + 273, 3)*helpVar).toFixed(2));
    var helpVar = parseFloat(((Math.pow((1 - (outputVarColdS['sigma2']/2)), 3)*(2*outputVarColdS['sigma1'] - 3)) + 1).toFixed(2));
    outputVarColdS['Cs'] = parseFloat((Math.pow(helpVar,-2)).toFixed(3));
    outputVarColdS['Alphak'] = parseFloat((inputVarColdS['AlphaNk']*inputVarColdS['Cz']*outputVarColdS['Cs']*inputVarColdS['Cf']).toFixed(2));
    outputVarColdS['Alpha1'] = parseFloat((inputVarColdS['ksi']*(outputVarColdS['Alphak']*(3.14*inputVarColdS['dn']/(2*inputVarColdS['S2']*1)) + outputVarColdS['Alphal'])).toFixed(2));
    outputVarColdS['kteplo'] = parseFloat((inputVarColdS['psi']*(outputVarColdS['Alpha1']/(1 + (outputVarColdS['Alpha1']/outputVarColdS['Alpha2'])))).toFixed(2));
    outputVarColdS['HgRash'] = parseFloat((outputVarCham['Br']*outputVarColdS['Qb']/(outputVarColdS['kteplo']*outputVarColdS['deltatlg'])).toFixed(2));
    outputVarColdS['pogreshnost'] = parseFloat((Math.abs((outputVarColdS['HgRash'] - outputVarColdS['Hg'])/outputVarColdS['HgRash'])*100).toFixed(2));
    outputVarColdS['lzm'] = parseFloat((outputVarColdS['HgRash']/(3.14*inputVarColdS['dn']*outputVarColdS['nzm']*outputVarColdS['nzah'])).toFixed(2));
    outputVarColdS['npruchastkov'] = parseFloat((outputVarColdS['HgRash']/(3.14*inputVarColdS['dn']*inputVarHotS['hgor']*outputVarColdS['nzm']*outputVarColdS['nzah'])).toFixed(0));


    $('#CSPaste1').text(outputVarColdS['deltai']);
    $('#CSPaste2').text(outputVarColdS['tsr']);
    $('#CSPaste3').text(outputVarColdS['I1strih1']);
    $('#CSPaste4').text(outputVarColdS['Teta1strih1']);
    $('#CSPaste5').text(outputVarColdS['Qb']);
    $('#CSPaste6').text(outputVarColdS['I1strih2']);
    $('#CSPaste7').text(outputVarColdS['TetaSr']);
    $('#CSPaste8').text(outputVarColdS['sigma1']);
    $('#CSPaste9').text(outputVarColdS['sigma2']);
    $('#CSPaste10').text(outputVarColdS['nzm']);
    $('#CSPaste11').text(outputVarColdS['f1']);
    $('#CSPaste12').text(outputVarColdS['nzah']);
    $('#CSPaste13').text(outputVarColdS['f2nov']);
    $('#CSPaste14').text(outputVarColdS['roW1nov']);
    $('#CSPaste15').text(outputVarColdS['Wp']);
    $('#CSPaste16').text(outputVarColdS['delta1tb']);
    $('#CSPaste17').text(outputVarColdS['delta1tm']);
    $('#CSPaste18').text(outputVarColdS['deltatlg']);
    $('#CSPaste19').text(outputVarColdS['F']);
    $('#CSPaste20').text(outputVarColdS['Wg']);
    $('#CSPaste21').text(outputVarColdS['Hg']);
    $('#CSPaste22').text(outputVarColdS['Stolshina']);
    $('#CSPaste23').text(outputVarColdS['kluch']);
    $('#CSPaste24').text(outputVarColdS['KpS']);
    $('#CSPaste25').text(outputVarColdS['aStupen']);
    $('#CSPaste26').text(outputVarColdS['Alpha2']);
    $('#CSPaste27').text(outputVarColdS['tz']);
    $('#CSPaste28').text(outputVarColdS['Alphal']);
    $('#CSPaste29').text(outputVarColdS['Cs']);
    $('#CSPaste30').text(outputVarColdS['Alphak']);
    $('#CSPaste31').text(outputVarColdS['Alpha1']);
    $('#CSPaste32').text(outputVarColdS['kteplo']);
    $('#CSPaste33').text(outputVarColdS['HgRash']);
    $('#CSPaste34').text(outputVarColdS['pogreshnost']);
    $('#CSPaste35').text(outputVarColdS['lzm']);
    $('#CSPaste36').text(outputVarColdS['npruchastkov']);

    $('#Economizer2step').addClass('animated jello').hide().show();
    $('.calculationEconomizer2').addClass('animated jello').hide().show();

  }

  //class calculationCOLDSTEP

  //----------------------------------------Economizer2-----------------------------------------------------------------

    // Click on the button okcalculationEconomizer2
    $('.okcalculationEconomizer2').on('click', function(){

      recalculationEconomizer2InputVariable();

    });
    // Click on the button okcalculationEconomizer2

    //class calculationEconomizer2

    function recalculationEconomizer2InputVariable(){

      inputVarEco2['i1Strih1'] = parseFloat($('#E2Field1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['i1Strih2'] = parseFloat($('#E2Field2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['t1Strih1'] = parseFloat($('#E2Field3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['t1Strih2'] = parseFloat($('#E2Field4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['Dek'] = parseFloat($('#E2Field5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['Teta1Strih2'] = parseFloat($('#E2Field5miss').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['Vv'] = parseFloat($('#E2Field6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['dn'] = parseFloat($('#E2Field7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['dvn'] = parseFloat($('#E2Field8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['S1'] = parseFloat($('#E2Field9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['S2'] = parseFloat($('#E2Field10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['lksh'] = parseFloat($('#E2Field11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['roWv1'] = parseFloat($('#E2Field12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['k'] = parseFloat($('#E2Field13').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['kg'] = parseFloat($('#E2Field14').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['kzl'] = parseFloat($('#E2Field15').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['psi'] = parseFloat($('#E2Field16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['deltatEk'] = parseFloat($('#E2Field16miss').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['AlphaN2'] = parseFloat($('#E2Field17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['Ct'] = parseFloat($('#E2Field18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['AlphaNl'] = parseFloat($('#E2Field19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['Cz'] = parseFloat($('#E2Field20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['Cf'] = parseFloat($('#E2Field21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['AlphaNk'] = parseFloat($('#E2Field22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['ksi'] = parseFloat($('#E2Field23').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
      inputVarEco2['npruchastkov'] = parseFloat($('#E2Field24').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));


      outputVarEco2['deltai'] = parseFloat((inputVarEco2['i1Strih2'] - inputVarEco2['i1Strih1']).toFixed(2));
      outputVarEco2['tsr'] = parseFloat(((inputVarEco2['t1Strih1'] + inputVarEco2['t1Strih2'])/2).toFixed(2));
      outputVarEco2['I1strih1'] = parseFloat((outputVarColdS['I1strih2']).toFixed(2));
      outputVarEco2['Teta1strih1'] = parseFloat((inputVarColdS['Teta1Strih2']).toFixed(2));
      outputVarEco2['Qb'] = parseFloat((inputVarEco2['Dek']*1000*outputVarEco2['deltai']/outputVarCham['Br']).toFixed(2));
      outputVarEco2['I1strih2'] = parseFloat(((outputVarCham['fi']*outputVarEco2['I1strih1'] - outputVarEco2['Qb'])/outputVarCham['fi']).toFixed(2));
      outputVarEco2['TetaSr'] = parseFloat(((outputVarEco2['Teta1strih1'] + inputVarEco2['Teta1Strih2'])/2).toFixed(2));
      outputVarEco2['sigma1'] = parseFloat((inputVarEco2['S1']/inputVarEco2['dn']).toFixed(2));
      outputVarEco2['sigma2'] = parseFloat((inputVarEco2['S2']/inputVarEco2['dn']).toFixed(2));
      outputVarEco2['nzm'] = parseFloat((inputVarEco2['lksh']/inputVarEco2['S1'] - 1).toFixed(0));
      outputVarEco2['f1'] = parseFloat((inputVarEco2['Dek']*1000/(3600*inputVarEco2['roWv1'])).toFixed(4));
      outputVarEco2['nzah'] = parseFloat((4*outputVarEco2['f1']/(3.14*Math.pow(inputVarEco2['dvn'], 2)*outputVarEco2['nzm']*2)).toFixed(0));
      outputVarEco2['f2nov'] = parseFloat(((2*3.14*Math.pow(inputVarEco2['dvn'], 2)/4)*outputVarEco2['nzm']*outputVarEco2['nzah']).toFixed(4));
      outputVarEco2['roW1nov'] = parseFloat((inputVarEco2['Dek']*1000/(outputVarEco2['f2nov']*3600)).toFixed(2));
      outputVarEco2['Wv'] = parseFloat((outputVarEco2['roW1nov']*inputVarEco2['Vv']).toFixed(2));
      outputVarEco2['delta1tb'] = parseFloat((outputVarEco2['Teta1strih1'] - inputVarEco2['t1Strih2']).toFixed(2));
      outputVarEco2['delta1tm'] = parseFloat((inputVarEco2['Teta1Strih2'] - inputVarEco2['t1Strih1']).toFixed(2));
      outputVarEco2['deltatlg'] = parseFloat(((outputVarEco2['delta1tb'] - outputVarEco2['delta1tm'])/(2.3*Math.log10(outputVarEco2['delta1tb']/outputVarEco2['delta1tm']))).toFixed(2));
      outputVarEco2['F'] = parseFloat((outputVarCham['as']*inputVarEco2['lksh'] - inputVarEco2['dn']*outputVarCham['as']*outputVarEco2['nzm']).toFixed(2));
      outputVarEco2['Wg'] = parseFloat((outputVarCham['Br']*massiveVolumeg[0]*(outputVarEco2['TetaSr'] + 273)/(3600*outputVarEco2['F']*273)).toFixed(2));
      outputVarEco2['Hg'] = parseFloat((outputVarCham['Br']*outputVarEco2['Qb']/(inputVarEco2['k']*outputVarEco2['deltatlg'])).toFixed(2));
      outputVarEco2['Stolshina'] = parseFloat((0.9*inputVarEco2['dn']*((4*inputVarEco2['S1']*inputVarEco2['S2']/(3.14*Math.pow(inputVarEco2['dn'], 2))) - 1)).toFixed(3));
      outputVarEco2['kluch'] = parseFloat((inputVarEco2['kg']*massiveRp[0] + inputVarEco2['kzl']*0.0057).toFixed(3));
      outputVarEco2['KpS'] = parseFloat((outputVarEco2['kluch']*1*outputVarEco2['Stolshina']).toFixed(3));
      outputVarEco2['aEco2'] = parseFloat((1 - 1/Math.pow(2.71828, outputVarEco2['KpS'])).toFixed(3));
      outputVarEco2['Alpha2'] = parseFloat((inputVarEco2['AlphaN2']*inputVarEco2['Ct']).toFixed(2));
      outputVarEco2['tz'] = parseFloat(((inputVarEco2['t1Strih1'] + inputVarEco2['t1Strih2'])/2 + inputVarEco2['deltatEk']).toFixed(2));
      outputVarEco2['Alphal'] = parseFloat((inputVarEco2['AlphaNl']*outputVarEco2['aEco2']).toFixed(2));
      var helpVar = parseFloat(((Math.pow((1 - (outputVarEco2['sigma2']/2)), 3)*(2*outputVarEco2['sigma1'] - 3)) + 1).toFixed(2));
      outputVarEco2['Cs'] = parseFloat((Math.pow(helpVar,-2)).toFixed(3));
      outputVarEco2['Alphak'] = parseFloat((inputVarEco2['AlphaNk']*inputVarEco2['Cz']*outputVarEco2['Cs']*inputVarEco2['Cf']).toFixed(2));
      outputVarEco2['Alpha1'] = parseFloat((inputVarEco2['ksi']*(outputVarEco2['Alphak'] + outputVarEco2['Alphal'])).toFixed(2));
      outputVarEco2['kteplo'] = parseFloat((inputVarEco2['psi']*outputVarEco2['Alpha1']).toFixed(2));
      outputVarEco2['HgRash'] = parseFloat((outputVarCham['Br']*outputVarEco2['Qb']/(outputVarEco2['kteplo']*outputVarEco2['deltatlg'])).toFixed(2));
      outputVarEco2['pogreshnost'] = parseFloat((Math.abs((outputVarEco2['Hg'] - outputVarEco2['HgRash'])/outputVarEco2['Hg'])*100).toFixed(2));
      outputVarEco2['lzm'] = parseFloat((outputVarEco2['HgRash']/(3.14*inputVarEco2['dn']*outputVarEco2['nzm']*outputVarEco2['nzah'])).toFixed(2));
      outputVarEco2['b'] = parseFloat((2*inputVarEco2['S2']*(inputVarEco2['npruchastkov'] - 1) + (inputVarEco2['npruchastkov']*inputVarEco2['dn']) + inputVarEco2['S2']).toFixed(4));


      $('#E2Paste1').text(outputVarEco2['deltai']);
      $('#E2Paste2').text(outputVarEco2['tsr']);
      $('#E2Paste3').text(outputVarEco2['I1strih1']);
      $('#E2Paste4').text(outputVarEco2['Teta1strih1']);
      $('#E2Paste5').text(outputVarEco2['Qb']);
      $('#E2Paste6').text(outputVarEco2['I1strih2']);
      $('#E2Paste7').text(outputVarEco2['TetaSr']);
      $('#E2Paste8').text(outputVarEco2['sigma1']);
      $('#E2Paste9').text(outputVarEco2['sigma2']);
      $('#E2Paste10').text(outputVarEco2['nzm']);
      $('#E2Paste11').text(outputVarEco2['f1']);
      $('#E2Paste12').text(outputVarEco2['nzah']);
      $('#E2Paste13').text(outputVarEco2['f2nov']);
      $('#E2Paste14').text(outputVarEco2['roW1nov']);
      $('#E2Paste15').text(outputVarEco2['Wv']);
      $('#E2Paste16').text(outputVarEco2['delta1tb']);
      $('#E2Paste17').text(outputVarEco2['delta1tm']);
      $('#E2Paste18').text(outputVarEco2['deltatlg']);
      $('#E2Paste19').text(outputVarEco2['F']);
      $('#E2Paste20').text(outputVarEco2['Wg']);
      $('#E2Paste21').text(outputVarEco2['Hg']);
      $('#E2Paste22').text(outputVarEco2['Stolshina']);
      $('#E2Paste23').text(outputVarEco2['kluch']);
      $('#E2Paste24').text(outputVarEco2['KpS']);
      $('#E2Paste25').text(outputVarEco2['aEco2']);
      $('#E2Paste26').text(outputVarEco2['Alpha2']);
      $('#E2Paste27').text(outputVarEco2['tz']);
      $('#E2Paste28').text(outputVarEco2['Alphal']);
      $('#E2Paste29').text(outputVarEco2['Cs']);
      $('#E2Paste30').text(outputVarEco2['Alphak']);
      $('#E2Paste31').text(outputVarEco2['Alpha1']);
      $('#E2Paste32').text(outputVarEco2['kteplo']);
      $('#E2Paste33').text(outputVarEco2['HgRash']);
      $('#E2Paste34').text(outputVarEco2['pogreshnost']);
      $('#E2Paste35').text(outputVarEco2['lzm']);
      $('#E2Paste36').text(outputVarEco2['b']);

      $('#AirHeater2Step').addClass('animated jello').hide().show();
      $('.calculationAirHeater2').addClass('animated jello').hide().show();

    }

    //class calculationEconomizer2

    //----------------------------------------AirHeater2-----------------------------------------------------------------

      // Click on the button okcalculationAirHeater2
      $('.okcalculationAirHeater2').on('click', function(){

        recalculationAirHeater2InputVariable();

      });
      // Click on the button okcalculationAirHeater2

      //class calculationAirHeater2

      function recalculationAirHeater2InputVariable(){

        inputVarAH2['i1Strih1'] = parseFloat($('#AH2Field1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['i1Strih2'] = parseFloat($('#AH2Field2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['t1Strih1'] = parseFloat($('#AH2Field3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['t1Strih2'] = parseFloat($('#AH2Field4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['deltaAlpha'] = parseFloat($('#AH2Field5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['Teta1Strih2'] = parseFloat($('#AH2Field6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['dn'] = parseFloat($('#AH2Field7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['dvn'] = parseFloat($('#AH2Field8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['S1'] = parseFloat($('#AH2Field9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['S2'] = parseFloat($('#AH2Field10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['Wvoz'] = parseFloat($('#AH2Field11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['psi'] = parseFloat($('#AH2Field12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['kg'] = parseFloat($('#AH2Field13').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['kzl'] = parseFloat($('#AH2Field14').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['AlphaNl'] = parseFloat($('#AH2Field15').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['AlphaN2'] = parseFloat($('#AH2Field16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['Cz'] = parseFloat($('#AH2Field17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['Cf1'] = parseFloat($('#AH2Field18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['AlphaNk'] = parseFloat($('#AH2Field19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['Cf2'] = parseFloat($('#AH2Field20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['Cl'] = parseFloat($('#AH2Field21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
        inputVarAH2['ksi'] = parseFloat($('#AH2Field22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));


        outputVarAH2['deltai'] = parseFloat((inputVarAH2['i1Strih2'] - inputVarAH2['i1Strih1']).toFixed(2));
        outputVarAH2['tsr'] = parseFloat(((inputVarAH2['t1Strih1'] + inputVarAH2['t1Strih2'])/2).toFixed(2));
        outputVarAH2['I1strih1'] = parseFloat((outputVarEco2['I1strih2']).toFixed(2));
        outputVarAH2['Teta1strih1'] = parseFloat((inputVarEco2['Teta1Strih2']).toFixed(2));
        outputVarAH2['Beta'] = parseFloat((Alpha[0] - inputVarCham['deltaAlphaPL']).toFixed(2));
        outputVarAH2['Qb'] = parseFloat(((outputVarAH2['Beta'] + inputVarAH2['deltaAlpha']/2)*outputVarAH2['deltai']).toFixed(2));
        outputVarAH2['I1strih2'] = parseFloat((((outputVarCham['fi']*outputVarAH2['I1strih1'] - outputVarAH2['Qb'])/outputVarCham['fi']) + inputVarCham['Ihv']*inputVarAH2['deltaAlpha']/2).toFixed(2));
        outputVarAH2['TetaSr'] = parseFloat(((outputVarAH2['Teta1strih1'] + inputVarAH2['Teta1Strih2'])/2).toFixed(2));
        outputVarAH2['sigma1'] = parseFloat((inputVarAH2['S1']/inputVarAH2['dn']).toFixed(2));
        outputVarAH2['sigma2'] = parseFloat((inputVarAH2['S2']/inputVarAH2['dn']).toFixed(2));
        outputVarAH2['ntrub'] = parseFloat((outputVarCham['as']/inputVarAH2['S1'] - 1).toFixed(0));
        outputVarAH2['nryadov'] = parseFloat((inputVarEco2['lksh']/inputVarAH2['S2'] - 1).toFixed(0));
        outputVarAH2['Nsumma'] = parseFloat((outputVarAH2['ntrub']*outputVarAH2['nryadov']).toFixed(0));
        outputVarAH2['F'] = parseFloat((outputVarAH2['Nsumma']*3.14*Math.pow(inputVarAH2['dvn'], 2)/4).toFixed(2));
        outputVarAH2['Wg'] = parseFloat((outputVarCham['Br']*massiveVolumeg[0]*(outputVarAH2['TetaSr'] + 273)/(3600*outputVarAH2['F']*273)).toFixed(2));
        outputVarAH2['delta1tb'] = parseFloat((inputVarAH2['Teta1Strih2'] - inputVarAH2['t1Strih1']).toFixed(2));
        outputVarAH2['delta1tm'] = parseFloat((outputVarAH2['Teta1strih1'] - inputVarAH2['t1Strih2']).toFixed(2));
        outputVarAH2['deltatlg'] = parseFloat(((outputVarAH2['delta1tb'] - outputVarAH2['delta1tm'])/(2.3*Math.log10(outputVarAH2['delta1tb']/outputVarAH2['delta1tm']))).toFixed(2));
        outputVarAH2['deltatSr'] = parseFloat((inputVarAH2['psi']*outputVarAH2['deltatlg']).toFixed(2));
        outputVarAH2['Stolshina'] = parseFloat((0.9*inputVarAH2['dn']*((4*inputVarAH2['S1']*inputVarAH2['S2']/(3.14*Math.pow(inputVarAH2['dn'], 2))) - 1)).toFixed(3));
        outputVarAH2['kluch'] = parseFloat((inputVarAH2['kg']*massiveRp[0] + inputVarAH2['kzl']*0.0057).toFixed(3));
        outputVarAH2['KpS'] = parseFloat((outputVarAH2['kluch']*1*outputVarAH2['Stolshina']).toFixed(3));
        outputVarAH2['aAH2'] = parseFloat((1 - 1/Math.pow(2.71828, outputVarAH2['KpS'])).toFixed(3));
        outputVarAH2['tz'] = parseFloat(((outputVarAH2['TetaSr'] + outputVarAH2['tsr'])/2).toFixed(2));
        outputVarAH2['Alphal'] = parseFloat((inputVarAH2['AlphaNl']*outputVarAH2['aAH2']).toFixed(2));
        var helpVar = parseFloat(((Math.pow((1 - (outputVarAH2['sigma2']/2)), 3)*(2*outputVarAH2['sigma1'] - 3)) + 1).toFixed(2));
        outputVarAH2['Cs'] = parseFloat((Math.pow(helpVar,-2)).toFixed(3));
        outputVarAH2['Alpha2'] = parseFloat((inputVarAH2['AlphaN2']*inputVarAH2['Cf1']*inputVarAH2['Cz']*outputVarAH2['Cs']).toFixed(2));
        outputVarAH2['Alphak'] = parseFloat((inputVarAH2['AlphaNk']*inputVarAH2['Cf2']*inputVarAH2['Cl']).toFixed(2));
        outputVarAH2['Alpha1'] = parseFloat((outputVarAH2['Alphak'] + outputVarAH2['Alphal']).toFixed(2));
        outputVarAH2['kteplo'] = parseFloat((inputVarAH2['ksi']*(outputVarAH2['Alpha1']*outputVarAH2['Alpha2']/(outputVarAH2['Alpha1'] + outputVarAH2['Alpha2']))).toFixed(2));
        outputVarAH2['Hg'] = parseFloat((outputVarCham['Br']*outputVarAH2['Qb']/(outputVarAH2['kteplo']*outputVarAH2['deltatSr'])).toFixed(2));
        outputVarAH2['dsr'] = parseFloat(((inputVarAH2['dn'] + inputVarAH2['dvn'])/2).toFixed(4));
        outputVarAH2['hvp'] = parseFloat((outputVarAH2['Hg']/(3.14*outputVarAH2['dsr']*outputVarAH2['Nsumma'])).toFixed(2));


        $('#AH2Paste1').text(outputVarAH2['deltai']);
        $('#AH2Paste2').text(outputVarAH2['tsr']);
        $('#AH2Paste3').text(outputVarAH2['I1strih1']);
        $('#AH2Paste4').text(outputVarAH2['Teta1strih1']);
        $('#AH2Paste5').text(outputVarAH2['Beta']);
        $('#AH2Paste6').text(outputVarAH2['Qb']);
        $('#AH2Paste7').text(outputVarAH2['I1strih2']);
        $('#AH2Paste8').text(outputVarAH2['TetaSr']);
        $('#AH2Paste9').text(outputVarAH2['sigma1']);
        $('#AH2Paste10').text(outputVarAH2['sigma2']);
        $('#AH2Paste11').text(outputVarAH2['ntrub']);
        $('#AH2Paste12').text(outputVarAH2['nryadov']);
        $('#AH2Paste12miss').text(outputVarAH2['Nsumma']);
        $('#AH2Paste13').text(outputVarAH2['F']);
        $('#AH2Paste14').text(outputVarAH2['Wg']);
        $('#AH2Paste15').text(outputVarAH2['delta1tb']);
        $('#AH2Paste16').text(outputVarAH2['delta1tm']);
        $('#AH2Paste17').text(outputVarAH2['deltatlg']);
        $('#AH2Paste18').text(outputVarAH2['deltatSr']);
        $('#AH2Paste19').text(outputVarAH2['Stolshina']);
        $('#AH2Paste20').text(outputVarAH2['kluch']);
        $('#AH2Paste21').text(outputVarAH2['KpS']);
        $('#AH2Paste22').text(outputVarAH2['aAH2']);
        $('#AH2Paste23').text(outputVarAH2['tz']);
        $('#AH2Paste24').text(outputVarAH2['Alphal']);
        $('#AH2Paste25').text(outputVarAH2['Alpha2']);
        $('#AH2Paste26').text(outputVarAH2['Cs']);
        $('#AH2Paste27').text(outputVarAH2['Alphak']);
        $('#AH2Paste28').text(outputVarAH2['Alpha1']);
        $('#AH2Paste29').text(outputVarAH2['kteplo']);
        $('#AH2Paste30').text(outputVarAH2['Hg']);
        $('#AH2Paste31').text(outputVarAH2['dsr']);
        $('#AH2Paste32').text(outputVarAH2['hvp']);

        $('#Economizer1step').addClass('animated jello').hide().show();
        $('.calculationEconomizer1').addClass('animated jello').hide().show();


      }

      //class calculationAirHeater2

      //----------------------------------------Economizer1-----------------------------------------------------------------

        // Click on the button okcalculationEconomizer1
        $('.okcalculationEconomizer1').on('click', function(){

          recalculationEconomizer1InputVariable();

        });
        // Click on the button okcalculationEconomizer1

        //class calculationEconomizer1

        function recalculationEconomizer1InputVariable(){

          inputVarEco1['i1Strih1'] = parseFloat($('#E1Field1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['i1Strih2'] = parseFloat($('#E1Field2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['t1Strih1'] = parseFloat($('#E1Field3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['t1Strih2'] = parseFloat($('#E1Field4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['Dek'] = parseFloat($('#E1Field5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['deltaAlpha'] = parseFloat($('#E1Field5miss1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['Teta1Strih2'] = parseFloat($('#E1Field5miss2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['Vv'] = parseFloat($('#E1Field6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['dn'] = parseFloat($('#E1Field7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['dvn'] = parseFloat($('#E1Field8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['S1'] = parseFloat($('#E1Field9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['S2'] = parseFloat($('#E1Field10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['lksh'] = parseFloat($('#E1Field11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['roWv1'] = parseFloat($('#E1Field12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['k'] = parseFloat($('#E1Field13').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['kg'] = parseFloat($('#E1Field14').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['kzl'] = parseFloat($('#E1Field15').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['psi'] = parseFloat($('#E1Field16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['deltatEk'] = parseFloat($('#E1Field16miss').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['AlphaN2'] = parseFloat($('#E1Field17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['Ct'] = parseFloat($('#E1Field18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['AlphaNl'] = parseFloat($('#E1Field19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['Cz'] = parseFloat($('#E1Field20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['Cf'] = parseFloat($('#E1Field21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['AlphaNk'] = parseFloat($('#E1Field22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['ksi'] = parseFloat($('#E1Field23').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
          inputVarEco1['npruchastkov'] = parseFloat($('#E1Field24').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));


          outputVarEco1['deltai'] = parseFloat((inputVarEco1['i1Strih2'] - inputVarEco1['i1Strih1']).toFixed(2));
          outputVarEco1['tsr'] = parseFloat(((inputVarEco1['t1Strih1'] + inputVarEco1['t1Strih2'])/2).toFixed(2));
          outputVarEco1['I1strih1'] = parseFloat((outputVarAH2['I1strih2']).toFixed(2));
          outputVarEco1['Teta1strih1'] = parseFloat((inputVarAH2['Teta1Strih2']).toFixed(2));
          outputVarEco1['Qb'] = parseFloat((inputVarEco1['Dek']*1000*outputVarEco1['deltai']/outputVarCham['Br']).toFixed(2));
          outputVarEco1['I1strih2'] = parseFloat((((outputVarCham['fi']*outputVarEco1['I1strih1'] - outputVarEco1['Qb'])/outputVarCham['fi']) + inputVarEco1['deltaAlpha']*inputVarCham['Ihv']).toFixed(2));
          outputVarEco1['TetaSr'] = parseFloat(((outputVarEco1['Teta1strih1'] + inputVarEco1['Teta1Strih2'])/2).toFixed(2));
          outputVarEco1['sigma1'] = parseFloat((inputVarEco1['S1']/inputVarEco1['dn']).toFixed(2));
          outputVarEco1['sigma2'] = parseFloat((inputVarEco1['S2']/inputVarEco1['dn']).toFixed(2));
          outputVarEco1['nzm'] = parseFloat((inputVarEco1['lksh']/inputVarEco1['S1'] - 1).toFixed(0));
          outputVarEco1['f1'] = parseFloat((inputVarEco1['Dek']*1000/(3600*inputVarEco1['roWv1'])).toFixed(4));
          outputVarEco1['nzah'] = parseFloat((4*outputVarEco1['f1']/(3.14*Math.pow(inputVarEco1['dvn'], 2)*outputVarEco1['nzm']*2)).toFixed(0));
          outputVarEco1['f2nov'] = parseFloat(((2*3.14*Math.pow(inputVarEco1['dvn'], 2)/4)*outputVarEco1['nzm']*outputVarEco1['nzah']).toFixed(4));
          outputVarEco1['roW1nov'] = parseFloat((inputVarEco1['Dek']*1000/(outputVarEco1['f2nov']*3600)).toFixed(2));
          outputVarEco1['Wv'] = parseFloat((outputVarEco1['roW1nov']*inputVarEco1['Vv']).toFixed(2));
          outputVarEco1['delta1tb'] = parseFloat((outputVarEco1['Teta1strih1'] - inputVarEco1['t1Strih2']).toFixed(2));
          outputVarEco1['delta1tm'] = parseFloat((inputVarEco1['Teta1Strih2'] - inputVarEco1['t1Strih1']).toFixed(2));
          outputVarEco1['deltatlg'] = parseFloat(((outputVarEco1['delta1tb'] - outputVarEco1['delta1tm'])/(2.3*Math.log10(outputVarEco1['delta1tb']/outputVarEco1['delta1tm']))).toFixed(2));
          outputVarEco1['F'] = parseFloat((outputVarCham['as']*inputVarEco1['lksh'] - inputVarEco1['dn']*outputVarCham['as']*outputVarEco1['nzm']).toFixed(2));
          outputVarEco1['Wg'] = parseFloat((outputVarCham['Br']*massiveVolumeg[0]*(outputVarEco1['TetaSr'] + 273)/(3600*outputVarEco1['F']*273)).toFixed(2));
          outputVarEco1['Hg'] = parseFloat((outputVarCham['Br']*outputVarEco1['Qb']/(inputVarEco1['k']*outputVarEco1['deltatlg'])).toFixed(2));
          outputVarEco1['Stolshina'] = parseFloat((0.9*inputVarEco1['dn']*((4*inputVarEco1['S1']*inputVarEco1['S2']/(3.14*Math.pow(inputVarEco1['dn'], 2))) - 1)).toFixed(3));
          outputVarEco1['kluch'] = parseFloat((inputVarEco1['kg']*massiveRp[0] + inputVarEco1['kzl']*0.0057).toFixed(3));
          outputVarEco1['KpS'] = parseFloat((outputVarEco1['kluch']*1*outputVarEco1['Stolshina']).toFixed(3));
          outputVarEco1['aEco1'] = parseFloat((1 - 1/Math.pow(2.71828, outputVarEco1['KpS'])).toFixed(3));
          outputVarEco1['Alpha2'] = parseFloat((inputVarEco1['AlphaN2']*inputVarEco1['Ct']).toFixed(2));
          outputVarEco1['tz'] = parseFloat(((inputVarEco1['t1Strih1'] + inputVarEco1['t1Strih2'])/2 + inputVarEco1['deltatEk']).toFixed(2));
          outputVarEco1['Alphal'] = parseFloat((inputVarEco1['AlphaNl']*outputVarEco1['aEco1']).toFixed(2));
          var helpVar = parseFloat(((Math.pow((1 - (outputVarEco1['sigma2']/2)), 3)*(2*outputVarEco1['sigma1'] - 3)) + 1).toFixed(2));
          outputVarEco1['Cs'] = parseFloat((Math.pow(helpVar,-2)).toFixed(3));
          outputVarEco1['Alphak'] = parseFloat((inputVarEco1['AlphaNk']*inputVarEco1['Cz']*outputVarEco1['Cs']*inputVarEco1['Cf']).toFixed(2));
          outputVarEco1['Alpha1'] = parseFloat((inputVarEco1['ksi']*(outputVarEco1['Alphak'] + outputVarEco1['Alphal'])).toFixed(2));
          outputVarEco1['kteplo'] = parseFloat((inputVarEco1['psi']*outputVarEco1['Alpha1']).toFixed(2));
          outputVarEco1['HgRash'] = parseFloat((outputVarCham['Br']*outputVarEco1['Qb']/(outputVarEco1['kteplo']*outputVarEco1['deltatlg'])).toFixed(2));
          outputVarEco1['pogreshnost'] = parseFloat((Math.abs((outputVarEco1['Hg'] - outputVarEco1['HgRash'])/outputVarEco1['Hg'])*100).toFixed(2));
          outputVarEco1['lzm'] = parseFloat((outputVarEco1['HgRash']/(3.14*inputVarEco1['dn']*outputVarEco1['nzm']*2*outputVarEco1['nzah'])).toFixed(2));
          outputVarEco1['b'] = parseFloat((2*inputVarEco1['S2']*(inputVarEco1['npruchastkov'] - 1) + (inputVarEco1['npruchastkov']*inputVarEco1['dn']) + inputVarEco1['S2']).toFixed(4));


          $('#E1Paste1').text(outputVarEco1['deltai']);
          $('#E1Paste2').text(outputVarEco1['tsr']);
          $('#E1Paste3').text(outputVarEco1['I1strih1']);
          $('#E1Paste4').text(outputVarEco1['Teta1strih1']);
          $('#E1Paste5').text(outputVarEco1['Qb']);
          $('#E1Paste6').text(outputVarEco1['I1strih2']);
          $('#E1Paste7').text(outputVarEco1['TetaSr']);
          $('#E1Paste8').text(outputVarEco1['sigma1']);
          $('#E1Paste9').text(outputVarEco1['sigma2']);
          $('#E1Paste10').text(outputVarEco1['nzm']);
          $('#E1Paste11').text(outputVarEco1['f1']);
          $('#E1Paste12').text(outputVarEco1['nzah']);
          $('#E1Paste13').text(outputVarEco1['f2nov']);
          $('#E1Paste14').text(outputVarEco1['roW1nov']);
          $('#E1Paste15').text(outputVarEco1['Wv']);
          $('#E1Paste16').text(outputVarEco1['delta1tb']);
          $('#E1Paste17').text(outputVarEco1['delta1tm']);
          $('#E1Paste18').text(outputVarEco1['deltatlg']);
          $('#E1Paste19').text(outputVarEco1['F']);
          $('#E1Paste20').text(outputVarEco1['Wg']);
          $('#E1Paste21').text(outputVarEco1['Hg']);
          $('#E1Paste22').text(outputVarEco1['Stolshina']);
          $('#E1Paste23').text(outputVarEco1['kluch']);
          $('#E1Paste24').text(outputVarEco1['KpS']);
          $('#E1Paste25').text(outputVarEco1['aEco1']);
          $('#E1Paste26').text(outputVarEco1['Alpha2']);
          $('#E1Paste27').text(outputVarEco1['tz']);
          $('#E1Paste28').text(outputVarEco1['Alphal']);
          $('#E1Paste29').text(outputVarEco1['Cs']);
          $('#E1Paste30').text(outputVarEco1['Alphak']);
          $('#E1Paste31').text(outputVarEco1['Alpha1']);
          $('#E1Paste32').text(outputVarEco1['kteplo']);
          $('#E1Paste33').text(outputVarEco1['HgRash']);
          $('#E1Paste34').text(outputVarEco1['pogreshnost']);
          $('#E1Paste35').text(outputVarEco1['lzm']);
          $('#E1Paste36').text(outputVarEco1['b']);

          $('#AirHeater1Step').addClass('animated jello').hide().show();
          $('.calculationAirHeater1').addClass('animated jello').hide().show();

        }

        //class calculationEconomizer1

        //----------------------------------------AirHeater1-----------------------------------------------------------------

          // Click on the button okcalculationAirHeater1
          $('.okcalculationAirHeater1').on('click', function(){

            recalculationAirHeater1InputVariable();

          });
          // Click on the button okcalculationAirHeater1

          //class calculationAirHeater1
          function recalculationAirHeater1InputVariable(){

            inputVarAH1['i1Strih1'] = parseFloat($('#AH1Field1').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['i1Strih2'] = parseFloat($('#AH1Field2').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['t1Strih1'] = parseFloat($('#AH1Field3').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['t1Strih2'] = parseFloat($('#AH1Field4').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['deltaAlpha'] = parseFloat($('#AH1Field5').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['Teta1Strih2'] = parseFloat($('#AH1Field6').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['dn'] = parseFloat($('#AH1Field7').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['dvn'] = parseFloat($('#AH1Field8').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['S1'] = parseFloat($('#AH1Field9').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['S2'] = parseFloat($('#AH1Field10').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['Wvoz'] = parseFloat($('#AH1Field11').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['psi'] = parseFloat($('#AH1Field12').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['AlphaN2'] = parseFloat($('#AH1Field16').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['Cz'] = parseFloat($('#AH1Field17').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['Cs'] = parseFloat($('#AH1Field17miss').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['Cf1'] = parseFloat($('#AH1Field18').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['AlphaNk'] = parseFloat($('#AH1Field19').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['Cf2'] = parseFloat($('#AH1Field20').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['Cl'] = parseFloat($('#AH1Field21').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));
            inputVarAH1['ksi'] = parseFloat($('#AH1Field22').val().match(/^.*?(-?\d+(?:\.\d+)?).*?$/));


            outputVarAH1['deltai'] = parseFloat((inputVarAH1['i1Strih2'] - inputVarAH1['i1Strih1']).toFixed(2));
            outputVarAH1['tsr'] = parseFloat(((inputVarAH1['t1Strih1'] + inputVarAH1['t1Strih2'])/2).toFixed(2));
            outputVarAH1['I1strih1'] = parseFloat((outputVarEco1['I1strih2']).toFixed(2));
            outputVarAH1['Teta1strih1'] = parseFloat((inputVarEco1['Teta1Strih2']).toFixed(2));
            outputVarAH1['Beta'] = parseFloat((Alpha[0] - inputVarCham['deltaAlphaPL']).toFixed(2));
            outputVarAH1['Qb'] = parseFloat(((outputVarAH1['Beta'] + inputVarAH1['deltaAlpha']/2)*outputVarAH1['deltai']).toFixed(2));
            outputVarAH1['I1strih2'] = parseFloat((((outputVarCham['fi']*outputVarAH1['I1strih1'] - outputVarAH1['Qb'])/outputVarCham['fi']) + inputVarCham['Ihv']*inputVarAH1['deltaAlpha']/2).toFixed(2));
            outputVarAH1['TetaSr'] = parseFloat(((outputVarAH1['Teta1strih1'] + inputVarAH1['Teta1Strih2'])/2).toFixed(2));
            outputVarAH1['sigma1'] = parseFloat((inputVarAH1['S1']/inputVarAH1['dn']).toFixed(2));
            outputVarAH1['sigma2'] = parseFloat((inputVarAH1['S2']/inputVarAH1['dn']).toFixed(2));
            outputVarAH1['ntrub'] = parseFloat((outputVarCham['as']/inputVarAH1['S1'] - 1).toFixed(0));
            outputVarAH1['nryadov'] = parseFloat((inputVarEco2['lksh']/inputVarAH1['S2'] - 1).toFixed(0));
            outputVarAH1['Nsumma'] = parseFloat((outputVarAH1['ntrub']*outputVarAH1['nryadov']).toFixed(0));
            outputVarAH1['F'] = parseFloat((outputVarAH1['Nsumma']*3.14*Math.pow(inputVarAH1['dvn'], 2)/4).toFixed(2));
            outputVarAH1['Wg'] = parseFloat((outputVarCham['Br']*massiveVolumeg[0]*(outputVarAH1['TetaSr'] + 273)/(3600*outputVarAH1['F']*273)).toFixed(2));
            outputVarAH1['delta1tb'] = parseFloat((inputVarAH1['Teta1Strih2'] - inputVarAH1['t1Strih1']).toFixed(2));
            outputVarAH1['delta1tm'] = parseFloat((outputVarAH1['Teta1strih1'] - inputVarAH1['t1Strih2']).toFixed(2));
            outputVarAH1['deltatlg'] = parseFloat(((outputVarAH1['delta1tb'] - outputVarAH1['delta1tm'])/(2.3*Math.log10(outputVarAH1['delta1tb']/outputVarAH1['delta1tm']))).toFixed(2));
            outputVarAH1['deltatSr'] = parseFloat((inputVarAH1['psi']*outputVarAH1['deltatlg']).toFixed(2));
            outputVarAH1['tz'] = parseFloat(((outputVarAH1['TetaSr'] + outputVarAH1['tsr'])/2).toFixed(2));
            outputVarAH1['Alpha2'] = parseFloat((inputVarAH1['AlphaN2']*inputVarAH1['Cf1']*inputVarAH1['Cz']*inputVarAH1['Cs']).toFixed(2));
            outputVarAH1['Alphak'] = parseFloat((inputVarAH1['AlphaNk']*inputVarAH1['Cf2']*inputVarAH1['Cl']).toFixed(2));
            outputVarAH1['Alpha1'] = parseFloat((outputVarAH1['Alphak']).toFixed(2));
            outputVarAH1['kteplo'] = parseFloat((inputVarAH1['ksi']*(outputVarAH1['Alpha1']*outputVarAH1['Alpha2']/(outputVarAH1['Alpha1'] + outputVarAH1['Alpha2']))).toFixed(2));
            outputVarAH1['Hg'] = parseFloat((outputVarCham['Br']*outputVarAH1['Qb']/(outputVarAH1['kteplo']*outputVarAH1['deltatSr'])).toFixed(2));
            outputVarAH1['dsr'] = parseFloat(((inputVarAH1['dn'] + inputVarAH1['dvn'])/2).toFixed(4));
            outputVarAH1['hvp'] = parseFloat((outputVarAH1['Hg']/(3.14*outputVarAH1['dsr']*outputVarAH1['Nsumma'])).toFixed(2));


            $('#AH1Paste1').text(outputVarAH1['deltai']);
            $('#AH1Paste2').text(outputVarAH1['tsr']);
            $('#AH1Paste3').text(outputVarAH1['I1strih1']);
            $('#AH1Paste4').text(outputVarAH1['Teta1strih1']);
            $('#AH1Paste5').text(outputVarAH1['Beta']);
            $('#AH1Paste6').text(outputVarAH1['Qb']);
            $('#AH1Paste7').text(outputVarAH1['I1strih2']);
            $('#AH1Paste8').text(outputVarAH1['TetaSr']);
            $('#AH1Paste9').text(outputVarAH1['sigma1']);
            $('#AH1Paste10').text(outputVarAH1['sigma2']);
            $('#AH1Paste11').text(outputVarAH1['ntrub']);
            $('#AH1Paste12').text(outputVarAH1['nryadov']);
            $('#AH1Paste12miss').text(outputVarAH1['Nsumma']);
            $('#AH1Paste13').text(outputVarAH1['F']);
            $('#AH1Paste14').text(outputVarAH1['Wg']);
            $('#AH1Paste15').text(outputVarAH1['delta1tb']);
            $('#AH1Paste16').text(outputVarAH1['delta1tm']);
            $('#AH1Paste17').text(outputVarAH1['deltatlg']);
            $('#AH1Paste18').text(outputVarAH1['deltatSr']);
            $('#AH1Paste23').text(outputVarAH1['tz']);
            $('#AH1Paste25').text(outputVarAH1['Alpha2']);
            $('#AH1Paste27').text(outputVarAH1['Alphak']);
            $('#AH1Paste28').text(outputVarAH1['Alpha1']);
            $('#AH1Paste29').text(outputVarAH1['kteplo']);
            $('#AH1Paste30').text(outputVarAH1['Hg']);
            $('#AH1Paste31').text(outputVarAH1['dsr']);
            $('#AH1Paste32').text(outputVarAH1['hvp']);

          }

          //class calculationAirHeater1
});
