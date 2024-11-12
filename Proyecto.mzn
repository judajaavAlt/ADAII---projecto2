int: n;  % Número total de personas
int: m;  % Número de opiniones posibles
int: maxM;  % Máximo número de movimientos permitidos
float: ct;  % Costo máximo total permitido
array[1..m] of int: p;  % Distribución inicial de personas por opinión
array[1..m] of float: v;  % Valores de las opiniones
array[1..m, 1..m] of float: c;  % Costos de mover de una opinión a otra
array[1..m] of float: ce;  % Costo extra si la opinión está inicialmente vacía

% Variables de decisión
array[1..m, 1..m] of var 0..n: x;  % Número de personas que se mueven de opinión i a j

%funcion objetivo
array[1..m] of var int: newP = [p[i] + sum(x[1..m, i]) - sum(x[i, 1..m])|i in 1..m];
array[1..n] of float: result = 
    array1d(1..n, 
        [v[i] | i in 1..m, j in 1..p[i]]
    );

% 2. Calcular la mediana de los valores extendidos
function var float: mediana() = 
  if n mod 2 == 0 then
    (result[n div 2] + result[n div 2 + 1])/2
  else
    result[n div 2 + 1]
  endif
;


% Función objetivo: Minimizar la polarización
var float: Pol = sum([newP[i]*abs(v[i] - mediana())| i in 1..m]);

% Restricciones

%La cantidad total de movimientos no debe ser mayor al máximo de movimientos permitidos
constraint sum(i, j in 1..m)(x[i,j] * abs(j - i)) <= maxM;

%La cantidad total de esfuerzo no debe ser mayor al esfuerzo máximo
constraint sum(i, j in 1..m)(x[i,j] * c[i,j] * (1 + (p[i] / n)) + (if p[j] = 0 then ce[j] * x[i,j] else 0 endif)) <= ct;

%No se puede mover más personas de una opinión i que las que inicialmente tienen esa opinión.
constraint forall(i in 1..m) (sum(j in 1..m)(x[i,j]) <= p[i]);

%no negatividad
constraint forall(i, j in 1..m) (x[i,j] >= 0);

solve minimize Pol;

