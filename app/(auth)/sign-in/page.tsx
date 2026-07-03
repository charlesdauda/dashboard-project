'use client';

import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className='form-title'>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <InputField
          name='email'
          label='Email'
          placeholder='Enter your email'
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^\w+@\w+\.\w+$/,
              message: 'Enter a valid email address',
            },
          }}
        />

        <InputField
          name='password'
          label='Password'
          placeholder='Enter your password'
          type='password'
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>

        <FooterLink text='Need an account? ' linkText='Sign up' href='/sign-up' />
      </form>
    </>
  );
};

export default SignIn;
