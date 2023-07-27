'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      showLinks={false}
      providers={[]}
      queryParams={{
        access_type: 'offline',
        prompt: 'consent',
      }}
      localization={{
        variables: {
          sign_in : {
            email_label: 'your email address',
          },
        },
      }}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}