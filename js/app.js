$(function() {
   function numberInParenthesis(number) {
      if (number < 0) {
         return '('+ number +')';
      }

      return number;
   }

   function steps2html(steps) {
      var html = '<ul class="expressions">';

      for (var i=0; i<steps.length; i++) {
         html += '<li class="expression">'+ katex.renderToString(steps[i]) +'</li>';
      }

      return html + '</ul>';
   }

   $('#solveEquation').on('click', function() {
      var a = $('#a').val() !== '' ? $('#a').val() : 1;
      var b = $('#b').val() !== '' ? $('#b').val() : 1;
      var c = $('#c').val() !== '' ? $('#c').val() : 1;

      var delta = Math.pow(b, 2) - 4 * a * c;
      var deltaSteps = [];

      deltaSteps.push("\\Delta = b^2 - 4 \\cdot a \\cdot c");
      deltaSteps.push("\\Delta = "+ numberInParenthesis(b) +"^2 - 4 \\cdot"+ numberInParenthesis(a) +"\\cdot"+ numberInParenthesis(c));
      deltaSteps.push("\\Delta = "+ delta);

      $('#steps').html('<h2 class="step-title">Encontrando Delta:</h2>');
      $('#steps').append(steps2html(deltaSteps));

      if (delta < 0) {
         $('#steps').append('<p class="info">Não existem raízes no conjunto dos números reais para a equação.</p>');
      } else {
         var bhaskaraSteps = [];
         var bInvertedSignal = b * -1;
         var denominator = 2 * a;

         bhaskaraSteps.push("x = \\frac{-b \\pm \\sqrt{\\Delta}}{2 \\cdot a}");
         bhaskaraSteps.push("x = \\frac{-"+ numberInParenthesis(b) +" \\pm \\sqrt{"+ delta +"}}{2 \\cdot "+ numberInParenthesis(a) +"}");

         if (delta === 0) {
            $('#steps').append('<p class="info">Existe 1 raíz no conjunto dos números reais para a equação.</p>');
            $('#steps').append('<h2 class="step-title">Aplicando Bhaskara:</h2>');

            var x = bInvertedSignal / denominator;

            bhaskaraSteps.push("x = \\frac{"+ bInvertedSignal +"}{"+ denominator +"}");
            bhaskaraSteps.push("x ="+ x);

            $('#steps').append(steps2html(bhaskaraSteps));
            $('#steps').append('<p class="info">A solução para a equação é o conjunto de números: {'+ x +'}</p>');
         } else {
            $('#steps').append('<p class="info">Existem 2 raízes no conjunto dos números reais para a equação.</p>');
            $('#steps').append('<h2 class="step-title">Aplicando Bhaskara:</h2>');

            var sqrtDelta = Math.sqrt(delta);

            var x1 = (bInvertedSignal + sqrtDelta) / denominator;
            var x2 = (bInvertedSignal - sqrtDelta) / denominator;

            bhaskaraSteps.push("x = \\frac{"+ bInvertedSignal +" \\pm "+ sqrtDelta +"}{"+ denominator +"}");
            bhaskaraSteps.push("x' = \\frac{"+ bInvertedSignal +" + "+ sqrtDelta +"}{"+ denominator +"}");
            bhaskaraSteps.push("x' ="+ x1);
            bhaskaraSteps.push("x'' = \\frac{"+ bInvertedSignal +" - "+ sqrtDelta +"}{"+ denominator +"}");
            bhaskaraSteps.push("x'' ="+ x2);

            $('#steps').append(steps2html(bhaskaraSteps));
            $('#steps').append('<p class="info">A solução para a equação é o conjunto de números: {'+ x1 +', '+ x2 +'}</p>');
         }
      }

      $('#resolution').show();
   });
});
