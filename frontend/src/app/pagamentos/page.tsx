'use client'

import React, { useState } from 'react'
import BaseLayout from '@/components/layout/base-layout'

interface Pagamento {
  id: number
  aluno: string
  valor: number
  data: string
  status: 'Pendente' | 'Pago' | 'Atrasado'
  metodoPagamento: string
}

export default function PagamentosPage() {
  const [formData, setFormData] = useState({
    aluno: '',
    valor: '',
    data: '',
    metodoPagamento: ''
  })

  const [pagamentos] = useState<Pagamento[]>([
    {
      id: 1,
      aluno: 'João Silva',
      valor: 150.00,
      data: '2024-02-01',
      status: 'Pago',
      metodoPagamento: 'Pix'
    },
    {
      id: 2,
      aluno: 'Maria Santos',
      valor: 150.00,
      data: '2024-02-05',
      status: 'Pendente',
      metodoPagamento: 'Cartão de Crédito'
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar lógica de registro de pagamento
    console.log('Dados do pagamento:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <BaseLayout>
      <div className="space-y-6">
        {/* Formulário de Registro de Pagamento */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Registrar Pagamento</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="aluno" className="block text-sm font-medium text-gray-700">
                  Aluno
                </label>
                <input
                  type="text"
                  name="aluno"
                  id="aluno"
                  value={formData.aluno}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                  Valor
                </label>
                <input
                  type="number"
                  name="valor"
                  id="valor"
                  value={formData.valor}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                  Data
                </label>
                <input
                  type="date"
                  name="data"
                  id="data"
                  value={formData.data}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="metodoPagamento" className="block text-sm font-medium text-gray-700">
                  Método de Pagamento
                </label>
                <select
                  name="metodoPagamento"
                  id="metodoPagamento"
                  value={formData.metodoPagamento}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione o método</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Registrar Pagamento
              </button>
            </div>
          </form>
        </div>

        {/* Tabela de Pagamentos */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Histórico de Pagamentos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aluno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pagamentos.map((pagamento) => (
                  <tr key={pagamento.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {pagamento.aluno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      R$ {pagamento.valor.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(pagamento.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${pagamento.status === 'Pago' ? 'bg-green-100 text-green-800' : 
                          pagamento.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {pagamento.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pagamento.metodoPagamento}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
} 