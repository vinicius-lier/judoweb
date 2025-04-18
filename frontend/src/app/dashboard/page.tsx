'use client'

import React, { useState, useEffect } from 'react'
import BaseLayout from '@/components/layout/base-layout'
import { UserGroupIcon, AcademicCapIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const [totalAlunos, setTotalAlunos] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTotalAlunos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students')
        const data = await response.json()
        setTotalAlunos(data.length)
      } catch (error) {
        console.error('Erro ao buscar total de alunos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTotalAlunos()
  }, [])

  if (loading) {
    return (
      <BaseLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Carregando...</p>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <UserGroupIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Total de Alunos</h2>
              <p className="text-3xl font-bold text-gray-900">{totalAlunos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <AcademicCapIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Turmas Ativas</h2>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Eventos Próximos</h2>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
} 