from .Caja import Caja


class CajaConstructor:
    '''
    Clase usada para construir los objetos Caja que se 
    van a agregar a las habitaciones con esta clase 
    se pueden ubicar las cajas automaticamanete en la
    habitacion donde pertenecen
    '''

    def __init__(self, habitacion):
        '''
        Constructor
        -------------
        args
        Habitacion habitacion: objeto Habitación al que se le quiere agregar la caja
        '''
        self.habitacion = habitacion

    def get_caja(self):
        '''
        Devuele un nuevo objeto Caja con
        la posicion adecuada
        '''
        caja_anterior = self.habitacion.hab_anterior.cajas[-1]
        habitacion_nueva_caja = self.habitacion
        new_x, new_y = self.get_posicion(caja_anterior)
        if new_x > 0:
            new_x = self.habitacion.ancho
        if new_y>0:
            new_y = self.habitacion.alto
        return Caja(new_x, new_y, habitacion_nueva_caja, caja_anterior)

    def get_posicion(self, caja_anterior):
        '''
        Devuelve la posicion de la caja que va a ser agregada
        si es la única en la habitación usa el mismo x & y de la anterior
        si es la segunda, se mueve según sea la orientación anterior
        '''
        new_x = caja_anterior.x
        new_y = caja_anterior.y

        # Si ya hay una caja en la habitacion, se calcula una nueva posicion
        if self.habitacion.cajas:
            caja_anterior = self.habitacion.cajas[0]
            orientacion =  self.habitacion.check_orientacion()
            if orientacion == 'horizontal':
                new_x = self.get_nueva_posicion(caja_anterior.x, self.habitacion.ancho)
            if orientacion == 'vertical':
                new_y = self.get_nueva_posicion(caja_anterior.y, self.habitacion.alto)

        return new_x, new_y

    def get_nueva_posicion(self, caja_anterior_pos, distancia):
        '''
        Devuelve una nueva posición para una segunda caja en la habitación
        Si la primera estaba en 0, la empuja hacia la siguiente pared
        Si no los estaba, lo devuelve a la pared que sea 0
        '''
        if caja_anterior_pos == 0:
            return distancia
        return 0
