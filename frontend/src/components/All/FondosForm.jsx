import { useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { createfondos } from '../services/fondos.service'; // Ajusta la ruta según tu estructura
import { useNavigate } from 'react-router-dom';

const FondoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await createfondos(data);
      if (response) {
        console.log(response); // Maneja la respuesta según tus necesidades
        navigate('/'); // Redirecciona a la lista de fondos después de crear
      }
    } catch (error) {
      console.error('Error al enviar el fondo:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Nuevo Fondo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.nombre}>
          <FormLabel htmlFor="nombre">Nombre del fondo:</FormLabel>
          <Input {...register('nombre', { required: 'Este campo es obligatorio' })} />
          <FormErrorMessage>{errors.nombre && errors.nombre.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.montoTotal}>
          <FormLabel htmlFor="montoTotal">Monto Total:</FormLabel>
          <Input {...register('montoTotal', { required: 'Este campo es obligatorio', min: { value: 1, message: 'El monto debe ser mayor que cero' } })} />
          <FormErrorMessage>{errors.montoTotal && errors.montoTotal.message}</FormErrorMessage>
        </FormControl>

        {/* Agrega más campos según tus necesidades */}

        <Button mt={4} colorScheme="teal" type="submit">Crear Fondo</Button>
      </form>
    </div>
  );
};

export default FondoForm;